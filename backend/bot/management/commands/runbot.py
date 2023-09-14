from django.core.management.base import BaseCommand
from django.conf import settings
from django.utils import autoreload

from bot.bot import bot


def start_bot(*args, **kwars):
    print("Starting bot...\n\n")
    bot.infinity_polling()			
    

class Command(BaseCommand):
  	# Используется как описание команды обычно
    help = 'Implemented to Django application telegram bot setup command'

    def handle(self, *args, **kwargs):
        autoreload.run_with_reloader(start_bot, args=None, kwargs=None)
