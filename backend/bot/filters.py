import telebot
from django.conf import settings

class IsAdmin(telebot.custom_filters.SimpleCustomFilter):
    key='is_admin'
    @staticmethod
    def check(message: telebot.types.Message):
        return message.from_user.id == settings.ADMIN_ID