from django.urls import path
from .views import UserInfo, SendDefaultUserPhoto, UserAppointments, UserEvents, UserList, UserPhoto, UserPhone, UserFull, UserTests, UserTestsByName

# Create your views here.

urlpatterns = [
    path('', UserList.as_view()),
    path('info/<str:id>', UserFull.as_view()),
    path('tests/<str:name>', UserTestsByName),
    path('tests', UserTests),
    path('me', UserInfo.as_view()),
    path('photo', UserPhoto),
    path('appointments', UserAppointments.as_view()),
    path('events', UserEvents),
    path('phone', UserPhone),
]