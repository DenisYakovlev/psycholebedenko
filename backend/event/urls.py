from django.urls import path, re_path
from .views import EventList, EventCreate, EventDetail, EventManagement, ParticipationManagement, EventImages, EventParticipants

urlpatterns = [
    path('', EventList.as_view()),
    path('create', EventCreate.as_view()),
    path('images', EventImages.as_view()),
    re_path(r"(?P<pk>[0-9]+)$", EventDetail.as_view()),
    re_path(r"(?P<pk>[0-9]+)/manage$", EventManagement.as_view()),
    re_path(r"(?P<pk>[0-9]+)/participate$", ParticipationManagement.as_view()),
    re_path(r"(?P<pk>[0-9]+)/participants$", EventParticipants.as_view()),
]
