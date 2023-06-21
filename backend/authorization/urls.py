from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from .views import AuthTelegramUser

# Create your views here.

urlpatterns = [
    path('', AuthTelegramUser.as_view()),
    path('refresh', TokenRefreshView.as_view()),
    path('verify', TokenVerifyView.as_view()),
]