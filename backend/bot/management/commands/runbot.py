from django.core.management.base import BaseCommand
from django.conf import settings

from bot.bot import bot

class Command(BaseCommand):
  	# Используется как описание команды обычно
    help = 'Implemented to Django application telegram bot setup command'

    def handle(self, *args, **kwargs):
        print("Starting bot...")
        bot.infinity_polling()			