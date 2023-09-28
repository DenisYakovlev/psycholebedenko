from django.conf import settings
import logging

# logger config is in app.settings file
logger = logging.getLogger('bot_logs')

TOKEN = settings.TELEGRAM_BOT_API_KEY

ADMIN_ID = settings.ADMIN_ID

month_names = {
    1: "Січня",
    2: "Лютого",
    3: "Березня",
    4: "Квітня",
    5: "Травня",
    6: "Червня",
    7: "Липня",
    8: "Серпня",
    9: "Вересня",
    10: "Жовтня",
    11: "Листопада",
    12: "Грудня",
}

day_names = {
    0: "Пон",
    1: "Вів",
    2: "Сер",
    3: "Чет",
    4: "Птн",
    5: "Суб",
    6: "Нед",
}