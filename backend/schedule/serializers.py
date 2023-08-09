from rest_framework import serializers
from .models import Schedule
from appointment.models import Appointment
from appointment.serializers import AppointmentSerializer


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ["id", "date"]

class ScheduleListSerializer(serializers.ModelSerializer):
    appointment = serializers.SerializerMethodField("get_appointment")
    class Meta:
        model = Schedule
        fields = ["id", "date", "appointment"]

    def get_appointment(self, obj):
        if obj.date is None:
            return None
        
        try:
            _appointment = Appointment.objects.get(date=obj.id)
            serializer = AppointmentSerializer(instance=_appointment)

            return serializer.data
        except Appointment.DoesNotExist:
            return None
        
