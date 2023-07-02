from rest_framework import serializers
from .models import TelegramUser


class TelegramUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramUser
        fields = ['id', 'first_name', 'last_name', 'username', 'phone_number', 'photo_url', 'auth_date', 'notifications_on',]