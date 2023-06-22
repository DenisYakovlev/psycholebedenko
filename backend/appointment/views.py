from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.http import Http404

from .models import Appointment
from .serializers import AppointmentSerializer, AppointmentListSerializer


class AppointmentList(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        appointments = Appointment.objects.all()
        serializer = AppointmentListSerializer(appointments, many=True)
        
        return Response(serializer.data, status.HTTP_200_OK)
    
    def post(self, request):
        serializer = AppointmentSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
        

class AppointmentDetail(APIView):
    permission_classes = [IsAdminUser]
    
    def get_appointment(self, name):
        try:
            return Appointment.objects.get(name=name)
        except:
            raise Http404
    
    def get(self, request, name):
        appointment = self.get_appointment(name)

        serializer = AppointmentListSerializer(appointment)
        return Response(serializer.data, status.HTTP_200_OK)
    
    def put(self, request, name):
        appointment = self.get_appointment(name)
        
        serializer = AppointmentSerializer(instance=appointment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.validated_data, status.HTTP_202_ACCEPTED)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, name):
        appointment = self.get_appointment(name)
        appointment.delete()
        return Response({"msg": f"{name} deleted"}, status.HTTP_204_NO_CONTENT)