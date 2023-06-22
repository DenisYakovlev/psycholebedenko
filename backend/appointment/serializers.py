import datetime
import pytz
from django.conf import settings
from rest_framework import serializers
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    zoom_link = serializers.CharField(read_only=True)
    
    class Meta:
        model = Appointment
        fields = ['name', 'notes', 'user', 'appointed', 'zoom_link']
        
    
    def generate_zoom_link(self, appointed):
        random_link = 'https://docs.djangoproject.com/en/3.0/ref/models/fields/#django.db.models.Field.default'
        return random_link
    
    def validate(self, attrs):
        data = super().validate(attrs)
        data['zoom_link'] =  self.generate_zoom_link(data['appointed'])

        return data
    
    
class AppointmentListSerializer(serializers.ModelSerializer):
    outdated = serializers.SerializerMethodField('get_outdated')
    
    class Meta:
        model = Appointment
        fields = ['name', 'notes', 'user', 'appointed', 'zoom_link', 'created_at', 'outdated'] 
        
    def get_outdated(self, obj):
        # change to timestamp
        tz = pytz.timezone(settings.TIME_ZONE)
        return obj.appointed < datetime.datetime.now(tz=tz)