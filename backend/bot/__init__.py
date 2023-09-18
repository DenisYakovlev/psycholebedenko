from django.conf import settings
import logging

# logger config is in app.settings file
logger = logging.getLogger('bot_logs')

TOKEN = settings.TELEGRAM_BOT_API_KEY

ADMIN_ID = settings.ADMIN_ID