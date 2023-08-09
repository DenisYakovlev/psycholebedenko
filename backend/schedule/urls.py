from django.urls import path
from .views import ScheduleList, ScheduleManage, ScheduleDetail

urlpatterns = [
    path('', ScheduleList.as_view()),
    path('create', ScheduleManage.as_view()),
    path('<int:pk>', ScheduleDetail.as_view()),
]
