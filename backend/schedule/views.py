from datetime import datetime, timedelta
import pytz
from django.conf import settings
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Schedule
from .serializers import ScheduleSerializer, ScheduleListSerializer
from appointment.models import Appointment
# Create your views here.


class ScheduleListDay(APIView):
    permission_classes = [IsAdminUser]

    def aware_date(self, date):
        tz = pytz.timezone(settings.TIME_ZONE)
        date = tz.localize(date)

        return date

    def get_queryset(self):
        try:
            date = self.request.query_params.get("date")
            date = datetime.strptime(date, "%Y-%m-%d")

            start_date = self.aware_date(date)
            end_date = start_date + timedelta(days=1)

            schedule = Schedule.objects.filter(date__range=[start_date, end_date])
            return schedule
        except:
            raise Http404
        
    def convertScheduleDate(self, date):
        # converting from "2023-08-30T16:00:00+03:00" to "16:00"
        parsed_datetime = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S%z")
        return parsed_datetime.strftime("%H:%M")

    def generateDaySchedule(self, actualSchedule: dict):
        """
            generate list for day schedule like this:
            "00:00": data1,
            "01:00": data2 ...
        """
        daySchedule = {}

        for hour in range(24):
            dayKey = f"{hour:02}:00"

            # from "2023-08-10" to "2023-08-10:15:00:00+tz"
            dayDate = self.request.query_params.get("date") + f"T{dayKey}:00"
            dayDate = datetime.strptime(dayDate, "%Y-%m-%dT%H:%M:%S")
            dayDate = self.aware_date(dayDate)

            # extract HH:MM from dayDate
            dayHour = dayDate.strftime("%H:%M")

            # check if value date is equal to key and append schedule value to it
            dayValue = filter(lambda item: self.convertScheduleDate(item["date"]) == dayKey, actualSchedule)

            daySchedule[dayKey] = {
                "date": dayDate,
                "time": dayHour,
                "schedule": next(dayValue, None)
            }
        
        return daySchedule

    def get(self, request):
        schedule = self.get_queryset()
        serializer = ScheduleListSerializer(schedule, many=True)

        data = self.generateDaySchedule(serializer.data)
        return Response(data, status.HTTP_200_OK)


class ScheduleList(APIView):
    permission_classes = []

    def get_queryset(self):
        status = self.request.query_params.get("status")

        tz = pytz.timezone(settings.TIME_ZONE)
        current_time = datetime.now(tz=tz)

        querySet = Schedule.objects.filter(date__gte=current_time).order_by("date")

        if not status:
            return querySet 
        
        usedDates = Appointment.objects. \
                exclude(date__isnull=True).values("date_id")
        
        if status == "free":
            return querySet.exclude(id__in=usedDates)
        elif status == "appointed":
            return querySet.filter(id__in=usedDates)


    def get(self, request):
        schedule = self.get_queryset()
        try:
            if request.user.is_staff:
                serializer = ScheduleListSerializer(schedule, many=True)
            else:
                serializer = ScheduleSerializer(schedule, many=True)
        except:
            serializer = ScheduleSerializer(schedule, many=True)

        return Response(serializer.data, status.HTTP_200_OK)
    

class ScheduleManage(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = ScheduleSerializer(data=request.data, many=True)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.validated_data, status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    

class ScheduleDetail(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self, pk):
        try:
            return Schedule.objects.get(id=pk)
        except:
            raise Http404

    def get(self, request, pk):
        obj = self.get_object(pk)
        serializer = ScheduleListSerializer(obj)

        return Response(serializer.data, status.HTTP_200_OK)

    def put(self, request, pk):
        obj = self.get_object(pk)
        serializer = ScheduleSerializer(instance=obj, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.validated_data, status.HTTP_200_OK)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        obj = self.get_object(pk)

        obj.delete()
        return Response({"msg": "deleted"}, status.HTTP_200_OK)
