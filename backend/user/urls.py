from django.urls import path
from .views import UserInfo, SendDefaultUserPhoto, UserAppointments, UserEvents, test

# Create your views here.

urlpatterns = [
    path('test', test),
    path('me', UserInfo),
    path('photo', SendDefaultUserPhoto),
    path('appointments', UserAppointments),
    path('events', UserEvents),
]