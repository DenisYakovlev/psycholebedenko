import datetime
import pytz
from django.conf import settings
from rest_framework import serializers
from .models import Event, Participation

class EventSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Event
        fields = '__all__'

    def validate(self, attrs):
        try:
            create_zoom_link = self.context['request'].data['create_zoom_link']
        except KeyError:
            create_zoom_link = False
    
        if create_zoom_link:
            random_link = 'https://docs.djangoproject.com/en/3.0/ref/models/fields/#django.db.models.Field.default'
            attrs['zoom_link'] = random_link
            
        return super().validate(attrs)


class EventListSerializer(serializers.ModelSerializer):
    participants_count = serializers.SerializerMethodField('get_participants_count')
    outdated = serializers.SerializerMethodField('get_outdated')
    participated = serializers.SerializerMethodField('get_participated')
    
    class Meta:
        model = Event
        fields = ['title', 'thumbnail_text', 'date', 'participants_count', 'outdated', 'participated', 'created_at']
        
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