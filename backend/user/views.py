import os

from django.conf import settings
from django.http import HttpResponse
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .serializers import TelegramUserSerializer
from appointment.serializers import AppointmentSerializer
from appointment.models import Appointment
from event.models import Event, Participation
from event.serializers import EventListSerializer, ParticipationSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def UserInfo(request):
    serializer = TelegramUserSerializer(instance=request.user)
    
    return Response({**serializer.data}, status.HTTP_200_OK)


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
    