import datetime
import pytz

from django.conf import settings
from rest_framework import serializers
from .models import Appointment
from user.serializers import TelegramUserSerializer
from schedule.serializers import ScheduleSerializer


class AppointmentSerializer(serializers.ModelSerializer):
    outdated = serializers.SerializerMethodField('get_outdated')
    date = ScheduleSerializer()
    
    class Meta:
        model = Appointment
        fields = ['id', 'title', 'notes', 'user', 'date', 'online', 'zoom_link', 'address', 'status', 'created_at', 'outdated']
        
    def get_outdated(self, obj):
        # change to timestamp
        if obj.date is None:
            return None
        
        tz = pytz.timezone(settings.TIME_ZONE)
        return obj.date.date < datetime.datetime.now(tz=tz)
    
    def validate(self, attrs):
        try:
            create_zoom_link = self.context['request'].data['create_zoom_link']
        except KeyError:
            create_zoom_link = False
        
        if create_zoom_link:
            random_link = 'https://docs.djangoproject.com/en/3.0/ref/models/fields/#django.db.models.Field.default'
            attrs['zoom_link'] = random_link
            
        return super().validate(attrs)
        

class AppointmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'title', 'notes', 'user', 'date', 'online', 'zoom_link', 'address', 'status', 'created_at']

    def validate(self, attrs):
        try:
            # got some issues with getting context from bot
            # need to refactor create_zoom_link as a serializer field
            if isinstance(self.context['request'], dict):
                create_zoom_link = self.context['request']['data']['create_zoom_link']
            else:
                create_zoom_link = self.context['request'].data['create_zoom_link']

        except KeyError:
            create_zoom_link = False
        
        if create_zoom_link:
            random_link = 'https://docs.djangoproject.com/en/3.0/ref/models/fields/#django.db.models.Field.default'
            attrs['zoom_link'] = random_link

        return super().validate(attrs)


class AppointmentListSerializer(serializers.ModelSerializer):
    user = TelegramUserSerializer()
    outdated = serializers.SerializerMethodField('get_outdated')
    date = ScheduleSerializer()
    
    class Meta:
        model = Appointment
        fields = ['id', 'title', 'notes', 'user', 'date', 'online', 'zoom_link', 'address', 'status', 'created_at', 'outdated']
        
    def get_outdated(self, obj):
        # change to timestamp
        if obj.date is None:
            return None
        
        tz = pytz.timezone(settings.TIME_ZONE)
        return obj.date.date < datetime.datetime.now(tz=tz)