from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from django.http import Http404

from .models import Event, Participation
from .serializers import EventSerializer, EventListSerializer, EventDetailSerializer, ParticipationSerializer


class EventList(APIView):
    # add params validations
    permission_classes = []
    
    def get(self, request):
        events = Event.objects.all()
        serializer = EventListSerializer(events, many=True, context = {'request': request})
        
        return Response(serializer.data, status.HTTP_200_OK)
    
class EventDetail(APIView):
    # add params
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