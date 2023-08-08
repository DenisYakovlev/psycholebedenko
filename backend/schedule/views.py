import datetime
import pytz
from django.conf import settings
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Schedule
from .serializers import ScheduleListSerializer
from appointment.models import Appointment
# Create your views here.


class ScheduleList(APIView):
    permission_classes = []

    def get_queryset(self):
        status = self.request.query_params.get("status")

        tz = pytz.timezone(settings.TIME_ZONE)
        current_time = datetime.datetime.now(tz=tz)

        querySet = Schedule.objects.filter(date__gte=current_time)

        if not status:
            return querySet 
        
        if status == "empty":
            usedDates = Appointment.objects.exclude(date__isnull=True).values("date_id")
            return querySet.exclude(id__in=usedDates)
        elif status == "appointed":
            usedDates = Appointment.objects.exclude(date__isnull=True).values("date_id")
            return querySet.filter(id__in=usedDates)


    def get(self, request):
        schedule = self.get_queryset()
        serializer = ScheduleListSerializer(schedule, many=True)

        return Response(serializer.data, status.HTTP_200_OK)

