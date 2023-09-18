from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from .views import AuthWidgetTelegramUser, AuthBotAppTelegramUser, PhoneVerificationRetry, PhoneVerificationCheck

# Create your views here.

urlpatterns = [
    path('telegram/widget', AuthWidgetTelegramUser.as_view()),
    path('telegram/botapp', AuthBotAppTelegramUser.as_view()),
    path('phone/verify', PhoneVerificationCheck.as_view()),
    path('phone/retry', PhoneVerificationRetry.as_view()),
    path('refresh', TokenRefreshView.as_view()),
    path('verify', TokenVerifyView.as_view()),
]