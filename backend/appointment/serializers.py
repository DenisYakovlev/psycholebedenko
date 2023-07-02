import datetime
import pytz
import uuid
from django.conf import settings
from rest_framework import serializers
from .models import Appointment
    
    
class AppointmentSerializer(serializers.ModelSerializer):
    outdated = serializers.SerializerMethodField('get_outdated')
    
    class Meta:
        model = Appointment
        fields = ['id', 'title', 'notes', 'user', 'date', 'online', 'zoom_link', 'address', 'status', 'created_at', 'outdated']
        
    def get_outdated(self, obj):
        # change to timestamp
        if obj.date is None:
            return None
        
        tz = pytz.timezone(settings.TIME_ZONE)
        return obj.date < datetime.datetime.now(tz=tz)
    
    def validate(self, attrs):
        try:
            create_zoom_link = self.context['request'].data['create_zoom_link']
        except KeyError:
            create_zoom_link = False
        
    
        if create_zoom_link:
            random_link = 'https://docs.djangoproject.com/en/3.0/ref/models/fields/#django.db.models.Field.default'
            attrs['zoom_link'] = random_link
            
        return super().validate(attrs)
        