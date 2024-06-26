from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.cache import cache
from django.utils import timezone
from django.db import transaction
from django.conf import settings
from celery import chain

from .serializers import AuthWidgetTelegramUserSerializer, AuthBotAppTelegramUserSerializer, PasswordlessTokenObtainPairSerializer, AuthBotAppSeamlessUserSerializer
from user.models import TelegramUser
from user.serializers import TelegramUserSerializer
from .utils import generatePhoneVerificationTokens
from bot.tasks import handlePhoneVerification, webAppDrivenAuthorization


def generatePhoneVerficationTimestamps():
    verification_start = int(timezone.localtime().timestamp())
    verification_end = verification_start + settings.PHONE_VERIFICATION_TIMEOUT_SECS

    return verification_start, verification_end


class AuthWidgetTelegramUser(APIView):
    permission_classes = []

    def HandleUserUpdate(self, request):
        user = TelegramUser.objects.get(id=request.data["id"])

        # validate user data and update it
        serializer = AuthWidgetTelegramUserSerializer(
            user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

            # create jwt tokens
            tokens_serializer = PasswordlessTokenObtainPairSerializer(
                data=serializer.validated_data)
            if tokens_serializer.is_valid():

                # check if user needs phone update and verification
                if not user.phone_number:
                    wsToken, confirmToken = generatePhoneVerificationTokens(
                        user.id, user.auth_date)
                    verification_start, verification_end = generatePhoneVerficationTimestamps()
                    handlePhoneVerification.delay(
                        request.data['id'], wsToken, confirmToken)

                    return Response({
                        **tokens_serializer.validated_data,
                        "phoneVerificationToken": wsToken,
                        "phoneVerificationStartTime": verification_start,
                        "phoneVerificationExpireTime": verification_end
                    }, status.HTTP_201_CREATED)

                # rerturn jwt tokens on default if phone is verified
                return Response({**tokens_serializer.validated_data}, status.HTTP_201_CREATED)

            return Response(tokens_serializer.errors, status.HTTP_409_CONFLICT)
        else:
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        # check if user exists and update his data
        if TelegramUser.objects.filter(id=request.data['id']).exists():
            return self.HandleUserUpdate(request)

        serializer = AuthWidgetTelegramUserSerializer(data=request.data)

        # validate telegram user data
        if serializer.is_valid():
            serializer.save()

            # create jwt tokens
            tokens_serializer = PasswordlessTokenObtainPairSerializer(
                data=serializer.validated_data)
            if tokens_serializer.is_valid():
                # notify user about his first authorization and start phone verification
                wsToken, confirmToken = generatePhoneVerificationTokens(
                    request.data['id'], request.data['auth_date'])
                verification_start, verification_end = generatePhoneVerficationTimestamps()

                chain(
                    webAppDrivenAuthorization.si(
                        request.data['id'], request.data['first_name'], first_authorization=True),
                    handlePhoneVerification.si(
                        request.data['id'], wsToken, confirmToken)
                ).apply_async()

                return Response({
                    **tokens_serializer.validated_data,
                    "phoneVerificationToken": wsToken,
                    "phoneVerificationStartTime": verification_start,
                    "phoneVerificationExpireTime": verification_end
                }, status.HTTP_201_CREATED)

            return Response(tokens_serializer.errors, status.HTTP_409_CONFLICT)

        return Response(serializer.errors, status.HTTP_409_CONFLICT)


class AuthBotAppTelegramUser(APIView):
    """
    Used for authorization of users that comes from Telegram WebApp:
    From clicking on menu button of bot or either clicking app link
    """

    permission_classes = []

    def create_user_from_initData(self, user):
        serializer = TelegramUserSerializer(data=user)

        if serializer.is_valid(raise_exception=True):
            user_obj = serializer.save()
            return user_obj

    @transaction.atomic
    def post(self, request):
        serializer = AuthBotAppTelegramUserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data.get('user')

            # Authorize user if he's not in db.
            # initData from request data should contain all his data
            # check serializer too see how initData auth works
            if not TelegramUser.objects.filter(id=user.get("id")).exists():
                self.create_user_from_initData(user)

            tokens_serializer = PasswordlessTokenObtainPairSerializer(
                data=user)

            if tokens_serializer.is_valid():
                return Response(tokens_serializer.validated_data, status.HTTP_201_CREATED)

            return Response(tokens_serializer.errors, status.HTTP_409_CONFLICT)

        return Response(serializer.errors, status.HTTP_409_CONFLICT)


class AuthBotAppSeamlessUser(APIView):
    # authorize user from bot without telegram init data
    # reply keyboard opens client without init data which used
    # in AuthBotAppTelegramUser. So instead use this

    permission_classes = []

    def post(self, request):
        serializer = AuthBotAppSeamlessUserSerializer(data=request.data)

        if serializer.is_valid():
            user = TelegramUser.objects.get(id=serializer.validated_data["id"])
            user_serializer = TelegramUserSerializer(user)

            tokens_serializer = PasswordlessTokenObtainPairSerializer(
                data=user_serializer.data)

            if tokens_serializer.is_valid():
                return Response(tokens_serializer.validated_data, status.HTTP_201_CREATED)

            return Response(tokens_serializer.errors, status.HTTP_409_CONFLICT)

        return Response(serializer.errors, status.HTTP_409_CONFLICT)


class PhoneVerificationRetry(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # reset timeout for tokens on phone verification
        # wsToken is needed to check if verification is not outdated

        token = request.data["wsToken"]

        if (cache.get(token) == None):
            return Response({"msg": "Connection token is not provided"}, status.HTTP_409_CONFLICT)

        wsToken, confirmToken = generatePhoneVerificationTokens(
            request.user.id, request.user.auth_date)
        verification_start, verification_end = generatePhoneVerficationTimestamps()
        handlePhoneVerification.delay(
            request.user.id, wsToken, confirmToken, forceStart=True)

        return Response({
            "phoneVerificationToken": wsToken,
            "phoneVerificationStartTime": verification_start,
            "phoneVerificationExpireTime": verification_end
        }, status.HTTP_200_OK)


class PhoneVerificationCheck(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            wsToken, confirmToken = request.data["wsToken"], request.data["confirmToken"]
            cached_confirmToken = cache.get(wsToken)

            if not cached_confirmToken or confirmToken != cached_confirmToken:
                return Response({"msg": "Wrong Token"}, status.HTTP_409_CONFLICT)

            return Response(status.HTTP_204_NO_CONTENT)
        except:
            return Response({"msg": "Token is wrong or expired"}, status.HTTP_409_CONFLICT)
