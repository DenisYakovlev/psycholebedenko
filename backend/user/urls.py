from django.urls import path
from .views import UserInfo, SendDefaultUserPhoto

# Create your views here.

urlpatterns = [
    path('', UserInfo),
    path('photo', SendDefaultUserPhoto),
]