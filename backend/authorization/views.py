from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .serializers import AuthWidgetTelegramUserSerializer, AuthBotAppTelegramUserSerializer, PasswordlessTokenObtainPairSerializer
from user.models import TelegramUser
from user.serializers import TelegramUserSerializer


class AuthWidgetTelegramUser(APIView):
    permission_classes = []
    
    # may be, this is not needed because serializer save method is updating values
    # need to check later
    def HandleUserUpdate(self, request):
        user = TelegramUser.objects.get(id=request.data["id"])
        
        # validate user data and update it
        serializer = AuthWidgetTelegramUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            
            # create jwt tokens
            tokens_serializer = PasswordlessTokenObtainPairSerializer(data=serializer.validated_data)
            if tokens_serializer.is_valid():
                return Response(tokens_serializer.validated_data, status.HTTP_201_CREATED)
            
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
            tokens_serializer = PasswordlessTokenObtainPairSerializer(data=serializer.validated_data)
            if tokens_serializer.is_valid():
                return Response(tokens_serializer.validated_data, status.HTTP_201_CREATED)
            
            return Response(tokens_serializer.errors, status.HTTP_409_CONFLICT)
            
        return Response(serializer.errors, status.HTTP_409_CONFLICT)
    

class AuthBotAppTelegramUser(APIView):
    permission_classes = []

    def post(self, request):
        serializer = AuthBotAppTelegramUserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data.get('user')
            tokens_serializer = PasswordlessTokenObtainPairSerializer(data=user)

            if tokens_serializer.is_valid():
                return Response(tokens_serializer.validated_data, status.HTTP_201_CREATED)
            
            return Response(tokens_serializer.errors, status.HTTP_409_CONFLICT)
        
        return Response(serializer.errors, status.HTTP_409_CONFLICT)