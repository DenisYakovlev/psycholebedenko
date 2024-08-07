import os
import time
import pytz
from datetime import datetime

from django.conf import settings
from django.http import HttpResponse
from django.db.models import Subquery, OuterRef
from django.http import Http404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import TelegramUser
from .paginations import UsersPagination
from .serializers import TelegramUserSerializer, TelegramUserUpdateSerializer
from .filters import UserAppointmentsFilters
from appointment.serializers import AppointmentSerializer
from appointment.models import Appointment
from event.models import Event, Participation
from event.serializers import EventListSerializer
from psy_tests.models import TestResult
from psy_tests.serializers import TestResultFullSerializer


class UserList(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    pagination_class = UsersPagination
    queryset = TelegramUser.objects.all()
    serializer_class = TelegramUserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['phone_number', 'username', 'first_name', 'last_name']


class UserInfo(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = TelegramUserSerializer(instance=request.user)
    
        return Response(serializer.data, status.HTTP_200_OK)
    
    def put(self, request):
        serializer = TelegramUserUpdateSerializer(instance=request.user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.validated_data, status.HTTP_200_OK)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    

class UserFull(APIView):
    permission_classes =[IsAdminUser]

    def get_object(self, id):
        try:
            user = TelegramUser.objects.get(id=id)
            user_serializer = TelegramUserSerializer(user)

            event_ids = Participation.objects.filter(user=user).values('event_id')
            events = Event.objects.filter(id__in=event_ids)

            latest_test_results_id = TestResult.objects.filter(
                user=OuterRef('user'),
                test=OuterRef('test')
            ).order_by('-created_at').values('id')

            latest_test_results = TestResult.objects.filter(user=user.id, id=Subquery(latest_test_results_id[:1]))
            tests_serializer = TestResultFullSerializer(latest_test_results, many=True)

            appointments = Appointment.objects.order_by('date__date').filter(user=user)

            return {
                "user": user_serializer.data, 
                "events": {
                    "link": "#",
                    "count": events.count()
                },
                "appointments": {
                    "link": f"/admin/appointments/?state=1&user={user.id}",
                    "count": appointments.count()
                },
                "tests": {test["test_name"]: test["result_hash"] for test in tests_serializer.data}
            }
        except:
            raise Http404

    def get(self, request, id):
        return Response(self.get_object(id), status.HTTP_200_OK)
    

class UserAppointments(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserAppointmentsFilters
    pagination_class = None

    def get_queryset(self):
        try:
            return Appointment.objects.order_by('date__date', 'status').filter(user=self.request.user)
        except:
            raise Http404
        

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def UserEvents(request):
    try:
        event_ids = Participation.objects.filter(user=request.user).values('event_id')
        events = Event.objects.filter(id__in=event_ids)
    except:
        return Response({}, status.HTTP_200_OK)
    
    serializer = EventListSerializer(events, many=True, context={"request": request})
    return Response(serializer.data, status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def UserPhoto(request):
    return Response({"photo_url": request.user.photo_url}, status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def SendDefaultUserPhoto(request):
    file_path = os.path.join(settings.MEDIA_ROOT, "user_photo.jpeg")

    try:
        with open(file_path, "rb") as f:
            return HttpResponse(f.read(), content_type="image/jpeg")
    except IOError:
        return HttpResponse({"msg": "file not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
@permission_classes([])
def SendSlowPhoto(request):
    time.sleep(5)
    return Response({"photo": "https://psycholebedenko-bucket.s3.eu-central-1.amazonaws.com/user_photo.jpeg"}, status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def UserPhone(request):
    phone_number = request.user.phone_number or None
    return Response({"phone_number": phone_number}, status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def UserTests(request):
    latest_test_results_id = TestResult.objects.filter(
        user=OuterRef('user'),
        test=OuterRef('test')
    ).order_by('-created_at').values('id')

    latest_test_results = TestResult.objects.filter(user=request.user.id, id=Subquery(latest_test_results_id[:1]))
    tests_serializer = TestResultFullSerializer(latest_test_results, many=True)

    return Response(tests_serializer.data, status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def UserTestsByName(request, name):
    try:
        latest_test_results_id = TestResult.objects.filter(
            user=OuterRef('user'),
            test=OuterRef('test')
        ).order_by('-created_at').values('id')

        latest_test_results = TestResult.objects.filter(
            user=request.user.id,
            test__name=name,
            id=Subquery(latest_test_results_id[:1])
        )
    except TestResult.DoesNotExist:
        raise Http404

    tests_serializer = TestResultFullSerializer(latest_test_results, many=True)

    return Response(tests_serializer.data, status.HTTP_200_OK)
