from django.urls import path
from .views import AppointmentList, AppointmentDetail, AppointmentCreate

urlpatterns = [
    path('', AppointmentList.as_view()),
    path('assign', AppointmentCreate.as_view()),
    path('<int:pk>', AppointmentDetail.as_view()),
]
