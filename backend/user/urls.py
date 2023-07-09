from django.urls import path
from .views import UserInfo, SendDefaultUserPhoto, UserAppointments, UserEvents, UserList

# Create your views here.

urlpatterns = [
    path('', UserList.as_view()),
    path('me', UserInfo.as_view()),
    path('photo', SendDefaultUserPhoto),
    path('appointments', UserAppointments),
    path('events', UserEvents),
]