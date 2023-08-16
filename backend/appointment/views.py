import pytz
import datetime

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.conf import settings
from django.http import Http404

from .models import Appointment
from .serializers import AppointmentSerializer, AppointmentListSerializer, AppointmentCreateSerializer
from user.models import TelegramUser
from schedule.models import Schedule


class AppointmentList(APIView):
    permission_classes = [IsAdminUser]
    
    def get_queryset(self):
        queryset = Appointment.objects.order_by('date__date')

        try:
            status = self.request.query_params.get('status').split(',')
            return queryset.filter(status__in=status)
        except:
            return queryset.all()
    
    def get(self, request):
        appointments = self.get_queryset()
        serializer = AppointmentListSerializer(appointments, many=True)
        
        return Response(serializer.data, status.HTTP_200_OK)
    
    def post(self, request):
        try:
            user_phone = request.data["user"]
            user = TelegramUser.objects.filter(phone_number=user_phone).first()
            request.data['user'] = user

            # only 5 pending appointments are allowed
            if Appointment.objects.filter(user=request.user, status=Appointment.Status.PENDING).count() > 5:
                return Response({"msg": "Pending appointments limit exceeded"}, status.HTTP_409_CONFLICT)
        except:
            return Response({"msg": "user not found"}, status.HTTP_404_NOT_FOUND)

        serializer = AppointmentCreateSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    

class AppointmentCreate(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        # set default values
        try:
            data = request.data
            data['user'] = self.request.user

            # only 5 pending appointments are allowed
            if Appointment.objects.filter(user=request.user, status=Appointment.Status.PENDING).count() > 5:
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
            return Appointment.objects.get(id=pk)
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
            return Response(serializer.data, status.HTTP_202_ACCEPTED)
        
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
