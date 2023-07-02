from django.urls import path
from .views import UserInfo, SendDefaultUserPhoto, UserAppointments, UserEvents

# Create your views here.

urlpatterns = [
    path('me', UserInfo),
    path('photo', SendDefaultUserPhoto),
    path('appointments', UserAppointments),
    path('events', UserEvents),
]