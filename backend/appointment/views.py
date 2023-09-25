import pytz
from datetime import datetime

from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.conf import settings
from django.http import Http404

from .models import Appointment
from .paginations import AppointmentPagination
from .filters import AppointmentFilters
from .serializers import AppointmentSerializer, AppointmentListSerializer, AppointmentCreateSerializer
from user.models import TelegramUser
from schedule.models import Schedule


class AppointmentClosest(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        tz = pytz.timezone(settings.TIME_ZONE)
        now = datetime.now(tz=tz)

        try:
            queryset = Appointment.objects.filter(date__date__gt=now).first()
            serializer = AppointmentListSerializer(queryset)

            return Response(serializer.data, status.HTTP_200_OK)
        except Appointment.DoesNotExist:
            return Response({}, status.HTTP_200_OK)


class AppointmentList(generics.ListCreateAPIView):
    permission_classes = [IsAdminUser]
    pagination_class = AppointmentPagination
    filterset_class = AppointmentFilters
    queryset = Appointment.objects.order_by('date__date').all()
    
    def get_serializer_class(self):
        serializers = {
            "GET": AppointmentListSerializer,
            "POST": AppointmentCreateSerializer
        }

        return serializers[self.request.method]
    
    def post(self, request):
        try:
            # only 10 pending appointments are allowed
            if Appointment.objects.filter(user=request.data["user"], status=Appointment.Status.PENDING).count() > 10:
                return Response({"msg": "Pending appointments limit exceeded"}, status.HTTP_409_CONFLICT)
            
        except Appointment.DoesNotExist:
            return Response({"msg": "user not found"}, status.HTTP_404_NOT_FOUND)
        
        return super().post(request)
    

class AppointmentCreate(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        # set default values
        try:
            data = request.data
            data['user'] = self.request.user

            # only 10 pending appointments are allowed
            if Appointment.objects.filter(user=request.user, status=Appointment.Status.PENDING).count() > 10:
                return Response({"msg": "Pending appointments limit exceeded"}, status.HTTP_409_CONFLICT)

            data['status'] = Appointment.Status.PENDING
        except:
            return Response({"msg": "user not found"}, status.HTTP_404_NOT_FOUND)

        serializer = AppointmentCreateSerializer(data=data, context={'request': self.request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


class AppointmentDetail(APIView):
    permission_classes = [IsAuthenticated]
    
    def get_appointment(self, pk):
        try:
            # staff user can get access to any appointment
            if self.request.user.is_staff:
                return Appointment.objects.get(id=pk)
            
            # return user appointment
            return Appointment.objects.filter(id=pk, user=self.request.user).first()
        except:
            raise Http404
    
    def get(self, request, pk):
        appointment = self.get_appointment(pk)

        serializer = AppointmentListSerializer(appointment)
        return Response(serializer.data, status.HTTP_200_OK)
    
    def put(self, request, pk):
        appointment = self.get_appointment(pk)
        
        serializer = AppointmentCreateSerializer(instance=appointment, data=request.data, 
                                           partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()

            # another serializer is used to serialize nested schedule object
            # and return date instead of date.id to client
            _serializer = AppointmentListSerializer(instance=appointment) \
                            if request.user.is_staff \
                            else AppointmentSerializer(instance=appointment)
            return Response(_serializer.data, status.HTTP_202_ACCEPTED)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        appointment = self.get_appointment(pk)
        title = appointment.title
        
        appointment.delete()
        return Response({"msg": f"{title} deleted"}, status.HTTP_200_OK)
    

class StatusList(APIView):
    permission_classes = []

    def get(self, request):
        status_list = Appointment.Status
        return Response({*status_list.values}, status.HTTP_200_OK)
