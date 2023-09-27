from telebot.types import ReplyKeyboardMarkup, KeyboardButton, WebAppInfo
from django.conf import settings
import hmac
import hashlib
from dotenv import load_dotenv
import os

load_dotenv('./.env.dev')

from user.models import TelegramUser


def gen_settings_markup(user_id):
    settings_markup = ReplyKeyboardMarkup(resize_keyboard=True)
    user = TelegramUser.objects.get(id=user_id)
    
    settings_markup.row(
        KeyboardButton(
            text="🔴 Вимкнути сповіщення" if user.notifications_on else "🟢 Включити сповіщення"
        ),
        
        KeyboardButton(
            text="📞 Змінити номер телефона"
        )
    )

    settings_markup.row(
        KeyboardButton(
            text="📇 Меню"
        )
    )

    return settings_markup


def gen_menu_markup(user_id):
    hash = hmac.new(settings.TELEGRAM_BOT_API_KEY.encode(), str(user_id).encode(), hashlib.sha256).hexdigest()
    menu_markup = ReplyKeyboardMarkup(resize_keyboard=True)
    webapp_url = os.getenv("BOT_WEB_APP_URL")

    menu_markup.row(
        KeyboardButton(
            text="📝 Записатись на консультацію", 
            web_app=WebAppInfo(f"{webapp_url}/appointment/create?id={user_id}&hash={hash}")
        )
    )
    
    menu_markup.row(
        KeyboardButton(
            text="📂 Мої консультації",
            web_app=WebAppInfo(f"{webapp_url}/appointment?id={user_id}&hash={hash}")
        ),

        KeyboardButton(
            text="💬 Групові зустрічі",
            web_app=WebAppInfo(f"{webapp_url}/event?id={user_id}&hash={hash}")
        )
    )
    
    menu_markup.row(
        KeyboardButton(
            text="✅ Тести",
            web_app=WebAppInfo(f"{webapp_url}/tests?id={user_id}&hash={hash}")
        ),
        KeyboardButton(
            text="⚙️ Налаштування",
        )
    )

    return menu_markup


phone_verification_markup = ReplyKeyboardMarkup(
    resize_keyboard=True,
    row_width=1
).add(
    KeyboardButton("Надати номер телефону", request_contact=True),
    KeyboardButton("Меню")
)