from rest_framework import serializers
from .models import Schedule
from appointment.models import Appointment


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
            _appointment = Appointment.objects.filter(date=obj.id).values_list("id")
            # serializer = AppointmentSerializer(instance=_appointment)

            return _appointment
        except Appointment.DoesNotExist:
            return None
        
