from django.urls import re_path 
from .consumers import PhoneVerificationConsumer

websocket_urlpatterns = [
    re_path(r"ws/bot/verification/(?P<token>[A-Za-z0-9_-]+)", PhoneVerificationConsumer.as_asgi())
]