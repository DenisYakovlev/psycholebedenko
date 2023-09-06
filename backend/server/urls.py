from django.urls import path
from .views import healthcheck, rabbit_test

urlpatterns = [
    path("", healthcheck),
    path("test", rabbit_test)
]