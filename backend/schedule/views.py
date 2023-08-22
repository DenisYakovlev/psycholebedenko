import datetime
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


class ScheduleList(APIView):
    permission_classes = []

    def get_queryset(self):
        status = self.request.query_params.get("status")

        tz = pytz.timezone(settings.TIME_ZONE)
        current_time = datetime.datetime.now(tz=tz)

        querySet = Schedule.objects.filter(date__gte=current_time).order_by("date")

        if not status:
            return querySet 
        
        if status == "free":
            usedDates = Appointment.objects.exclude(date__isnull=True).values("date_id")
            return querySet.exclude(id__in=usedDates)
        elif status == "appointed":
            usedDates = Appointment.objects.exclude(date__isnull=True).values("date_id")
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
