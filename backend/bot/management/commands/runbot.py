from time import sleep
from django.core.management.base import BaseCommand
from django.conf import settings
from django.utils import autoreload

from bot.bot import bot
from bot import logger


def start_bot(*args, **kwars):
    print("Starting bot...\n\n")

    # in case connection with telegram fails(Connection aborted error)
    while True:
        try:
            logger.debug('polling')
            bot.polling(none_stop=True)
        except Exception as _ex:
            print(_ex)
            sleep(15)	
    

class Command(BaseCommand):
    help = 'built in telegram bot. On debug mode run with startReloader'

    def handle(self, *args, **kwargs):
        if settings.BOT_DEBUG == True:
            autoreload.run_with_reloader(start_bot, args=None, kwargs=None)
        else:
            start_bot()
