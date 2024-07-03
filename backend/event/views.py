import datetime
import pytz

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from django.http import Http404
from django.conf import settings

from .models import Event, Participation
from .tasks import create_event_zoom_link
from .paginations import EventPagination
from .serializers import EventSerializer, EventListSerializer, EventDetailSerializer, ParticipationSerializer, ParticipationInfoSerializer
from .filters import EventFilter


class EventList(generics.ListAPIView):
    permission_classes = []
    queryset = Event.objects.all()
    pagination_class = None
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_class = EventFilter
    search_fields = ['title']

    def get_serializer_class(self):
        return EventDetailSerializer if self.request.user.is_staff else EventListSerializer
    
    
class EventDetail(APIView):
    permission_classes = []

    def get_event(self, pk):
        try:
            return Event.objects.get(id=pk)
        except:
            raise Http404
    
    def get(self, request, pk):
        event = self.get_event(pk)
        serializer = EventDetailSerializer(event, context = {'request': request})
        
        return Response(serializer.data, status.HTTP_200_OK)


class EventCreate(APIView):
    permission_classes = [IsAdminUser]
    
    def post(self, request):
        serializer = EventSerializer(data=request.data)
        
        if serializer.is_valid():
            obj = serializer.save()

            if request.data.get("create_zoom_link") == 'true':
                create_event_zoom_link.delay(obj.id)

            return Response(serializer.validated_data, status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


class EventManagement(APIView):
    permission_classes = [IsAdminUser]
    
    def get_event(self, pk):
        try:
            return Event.objects.get(id=pk)
        except:
            raise Http404
    
    def put(self, request, pk):
        event = self.get_event(pk)
        serializer = EventSerializer(instance=event, data=request.data, partial=True,)

        if serializer.is_valid():
            obj = serializer.save()

            if request.data.get("create_zoom_link"):
                create_event_zoom_link.delay(obj.id)

            return Response(serializer.validated_data, status.HTTP_200_OK)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        event = self.get_event(pk)
        event.delete()
        
        return Response(status=status.HTTP_200_OK)
    

class ParticipationManagement(APIView):
    permission_classes = [IsAuthenticated]
    
    def get_event(self, pk):
        try:
            return Event.objects.get(id=pk)
        except:
            raise Http404
    
    def post(self, request, pk):
        event = self.get_event(pk)
        
        if Participation.objects.filter(user=request.user.id, event=event.id).exists():
            return Response({"msg": "already participated"}, status.HTTP_409_CONFLICT)
        
        if event.participants.count() >= event.participants_limit:
            return Response({"msg": "participants limit exceeded"}, status.HTTP_409_CONFLICT)
        
        serializer = ParticipationSerializer(data={'user': request.user.id, 'event': event.id})
        
        if serializer.is_valid():
            serializer.save()
            return Response(status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        event = self.get_event(pk)
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
            "https://psycholebedenko-bucket.s3.eu-central-1.amazonaws.com/event_img_1.jpg",
            "https://psycholebedenko-bucket.s3.eu-central-1.amazonaws.com/event_img_2.jpg",
            "https://psycholebedenko-bucket.s3.eu-central-1.amazonaws.com/event_img_3.jpg",
            "https://psycholebedenko-bucket.s3.eu-central-1.amazonaws.com/event_img_4.jpg"
        }, status.HTTP_200_OK)


class EventParticipants(generics.RetrieveAPIView):
    permission_classes = [IsAdminUser]
    queryset = Participation.objects.all()
    serializer_class = ParticipationInfoSerializer
    pagination_class = None
    
    def get(self, request, pk):
        queryset = self.get_queryset().filter(event=pk)

        serializer = self.serializer_class(queryset, many=True)
        data = [item["user"] for item in serializer.data]
        
        return Response(data, status.HTTP_200_OK)
    

class EventListParticipants(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    pagination_class = EventPagination
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_class = EventFilter
    search_fields = ['title']

