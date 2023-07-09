from django.urls import path
from .views import AppointmentList, AppointmentDetail, AppointmentCreate, StatusList

urlpatterns = [
    path('', AppointmentList.as_view()),
    path('statuses', StatusList.as_view()),
    path('create', AppointmentCreate.as_view()),
    path('<int:pk>', AppointmentDetail.as_view()),
]
