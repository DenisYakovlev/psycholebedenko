import datetime
import pytz

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from django.http import Http404
from django.conf import settings

from .models import Event, Participation
from .serializers import EventSerializer, EventListSerializer, EventDetailSerializer, ParticipationSerializer


class EventList(APIView):
    permission_classes = []

    def get_queryset(self):
        status = self.request.query_params.get('status')

        if not status:
            return Event.objects.all()

        tz = pytz.timezone(settings.TIME_ZONE)
        current_time = datetime.datetime.now(tz=tz)

        if status == "active":
            return Event.objects.filter(date__gt=current_time)
        elif status == "outdated":
            return Event.objects.filter(date__lt=current_time)
        else:
            raise Http404
            
    
    def get(self, request):
        events = self.get_queryset()
        serializer = EventListSerializer(events, many=True, context = {'request': request})
        
        return Response(serializer.data, status.HTTP_200_OK)
    
class EventDetail(APIView):
    permission_classes = []
    
    def get(self, request, title):
        event = Event.objects.get(title=title)
        serializer = EventDetailSerializer(event, context = {'request': request})
        
        return Response(serializer.data, status.HTTP_200_OK)


class EventCreate(APIView):
    permission_classes = [IsAdminUser]
    
    def post(self, request):
        serializer = EventSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.validated_data, status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


class EventManagement(APIView):
    permission_classes = [IsAdminUser]
    
    def get_event(self, title):
        try:
            return Event.objects.get(title=title)
        except:
            raise Http404
    
    def put(self, request, title):
        event = self.get_event(title)
        serializer = EventSerializer(instance=event, data=request.data, partial=True,
                                         context = {"request": request})
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.validated_data, status.HTTP_200_OK)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, title):
        event = self.get_event(title)
        event.delete()
        
        return Response(status=status.HTTP_200_OK)
    

class ParticipationManagement(APIView):
    permission_classes = [IsAuthenticated]
    
    def get_event(self, title):
        try:
            return Event.objects.get(title=title)
        except:
            raise Http404
    
    def post(self, request, title):
        event = self.get_event(title)
        
        if Participation.objects.filter(user=request.user.id, event=event.id).exists():
            return Response({"msg": "already participated"}, status.HTTP_409_CONFLICT)
        
        serializer = ParticipationSerializer(data={'user': request.user.id, 'event': event.id})
        
        if serializer.is_valid():
            serializer.save()
            return Response(status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, title):
        event = self.get_event(title)
        participation = Participation.objects.filter(user=request.user.id, event=event.id)
        participation.delete()
        
        return Response(status=status.HTTP_200_OK)
    

class EventImages(APIView):
    """
        default images for creating events
        static, because s3 bucket is not connected to server
    """
    permission_classes = []

    def get(self, request):
        return Response({
            "https://psycholebedenko-backend.s3.amazonaws.com/event_img_1.jpeg",
            "https://psycholebedenko-backend.s3.amazonaws.com/event_img_2.jpeg",
            "https://psycholebedenko-backend.s3.amazonaws.com/event_img_3.jpeg",
            "https://psycholebedenko-backend.s3.amazonaws.com/event_img_4.jpeg"
        }, status.HTTP_200_OK)