from django.core.management.base import BaseCommand
from django.conf import settings
from django.utils import autoreload

from bot.bot import bot


def start_bot(*args, **kwars):
    print("Starting bot...\n\n")
    bot.infinity_polling()		
    

class Command(BaseCommand):
    help = 'built in telegram bot. On debug mode run with startReloader'

    def handle(self, *args, **kwargs):
        if settings.DEBUG == True:
            autoreload.run_with_reloader(start_bot, args=None, kwargs=None)
        else:
            start_bot()
