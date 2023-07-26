from django.urls import path
from .views import UserInfo, SendDefaultUserPhoto, UserAppointments, UserEvents, UserList, UserPhoto

# Create your views here.

urlpatterns = [
    path('', UserList.as_view()),
    path('me', UserInfo.as_view()),
    path('photo', UserPhoto),
    path('appointments', UserAppointments),
    path('events', UserEvents),
]