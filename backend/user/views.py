import os

from django.conf import settings
from django.http import HttpResponse
from django.http import Http404
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import TelegramUser
from .serializers import TelegramUserSerializer, TelegramUserUpdateSerializer
from appointment.serializers import AppointmentSerializer
from appointment.models import Appointment
from event.models import Event, Participation
from event.serializers import EventListSerializer, ParticipationSerializer


class UserList(APIView, LimitOffsetPagination):
    permission_classes = [IsAdminUser]

    def get(self, request):
        user = TelegramUser.objects.all()

        results = self.paginate_queryset(user, request, view=self)
        serializer = TelegramUserSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)


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


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def UserAppointments(request):
    try:
        appointments = Appointment.objects.filter(user=request.user)
    except:
        raise Http404
    
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data, status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def UserEvents(request):
    try:
        event_ids = Participation.objects.filter(user=request.user).values('event_id')
        events = Event.objects.filter(id__in=event_ids)
    except:
        raise Http404
    
    serializer = EventListSerializer(events, many=True, context={"request": request})
    return Response(serializer.data, status.HTTP_200_OK)
        

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def SendDefaultUserPhoto(request):
    file_path = os.path.join(settings.MEDIA_ROOT, "user_photo.jpeg")

    try:
        with open(file_path, "rb") as f:
            return HttpResponse(f.read(), content_type="image/jpeg")
    except IOError:
        return HttpResponse({"msg": "file not found"}, status=status.HTTP_404_NOT_FOUND)
    