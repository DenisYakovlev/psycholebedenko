import datetime
import pytz
from django.conf import settings
from rest_framework import serializers

from .models import Event, Participation
from user.serializers import TelegramUserSerializer

class EventSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Event
        fields = '__all__'

    def validate(self, attrs):
            
        return super().validate(attrs)


class EventListSerializer(serializers.ModelSerializer):
    participants_count = serializers.SerializerMethodField('get_participants_count')
    outdated = serializers.SerializerMethodField('get_outdated')
    participated = serializers.SerializerMethodField('get_participated')
    participants_limit_exceeded = serializers.SerializerMethodField('get_participants_limit_exceeded')
    
    class Meta:
        model = Event
        fields = [
            'id', 
            'title', 
            'thumbnail_text', 
            'date', 
            'img_url', 
            'duration', 
            'participated',
            'participants_count',
            'participants_limit', 
            'participants_limit_exceeded',
            'outdated', 
            'online', 
            'created_at',
        ]
        
    def get_participants_count(self, obj):
        return obj.participants.all().count()
    
    def get_outdated(self, obj):
        # change to timestamp
        try:
            tz = pytz.timezone(settings.TIME_ZONE)
            return obj.date < datetime.datetime.now(tz=tz)
        except:
            return None
    
    def get_participated(self, obj):
        try:
            user = self.context["request"].user
            return Participation.objects.filter(user=user.id, event=obj.id).exists()
        except KeyError:
            return False
        
    def get_participants_limit_exceeded(self, obj):
        participants_count = obj.participants.all().count()

        return participants_count >= obj.participants_limit
        
        
class EventDetailSerializer(EventListSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['main_text'] = serializers.CharField()
        self.fields['online'] = serializers.BooleanField()
        self.fields['zoom_link'] = serializers.URLField()
        self.fields['address'] = serializers.CharField()
    
    
class ParticipationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participation
        fields = ['user', 'event']


class ParticipationInfoSerializer(serializers.ModelSerializer):
    user = TelegramUserSerializer()
    
    class Meta:
        model = Participation
        fields = ['user', 'event']