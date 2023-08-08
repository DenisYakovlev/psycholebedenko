from django.urls import path
from .views import ScheduleList

urlpatterns = [
    path('', ScheduleList.as_view()),
]
