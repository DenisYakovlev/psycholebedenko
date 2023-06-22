from django.urls import path
from .views import AppointmentList, AppointmentDetail

urlpatterns = [
    path('', AppointmentList.as_view()),
    path('<str:name>', AppointmentDetail.as_view()),
]
