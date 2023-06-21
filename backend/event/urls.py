from django.urls import path, re_path
from .views import EventList, EventCreate, EventDetail, EventManagement, ParticipationManagement

urlpatterns = [
    path('', EventList.as_view()),
    path('create', EventCreate.as_view()),
    re_path(r"(?P<title>[a-zA-Z0-9 _\-]+)$", EventDetail.as_view()),
    re_path(r"(?P<title>[a-zA-Z0-9 _\-]+)/manage$", EventManagement.as_view()),
    re_path(r"(?P<title>[a-zA-Z0-9 _\-]+)/participate$", ParticipationManagement.as_view()),
]
