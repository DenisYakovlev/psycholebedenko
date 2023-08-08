import datetime
import pytz
import uuid
from django.conf import settings
from rest_framework import serializers
from .models import Appointment
from user.serializers import TelegramUserSerializer
from schedule.models import Schedule
from schedule.serializers import ScheduleListSerializer


class AppointmentSerializer(serializers.ModelSerializer):
    outdated = serializers.SerializerMethodField('get_outdated')
    date = serializers.SerializerMethodField('get_date')
    
    class Meta:
        model = Appointment
        fields = ['id', 'title', 'notes', 'user', 'date', 'online', 'zoom_link', 'address', 'status', 'created_at', 'outdated']

    def get_date(self, obj):
        # return date instead of Schedule instance
        if obj.date is None:
            return None

        return obj.date.date
        
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
    date = serializers.SerializerMethodField('get_date')
    
    class Meta:
        model = Appointment
        fields = ['id', 'title', 'notes', 'user', 'date', 'online', 'zoom_link', 'address', 'status', 'created_at', 'outdated']

    def get_date(self, obj):
        # return date instead of Schedule instance
        if obj.date is None:
            return None

        return obj.date.date
        
    def get_outdated(self, obj):
        # change to timestamp
        if obj.date is None:
            return None
        
        tz = pytz.timezone(settings.TIME_ZONE)
        return obj.date.date < datetime.datetime.now(tz=tz)