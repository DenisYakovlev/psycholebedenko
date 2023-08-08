from rest_framework import serializers
from .models import Schedule


class ScheduleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ["date"]