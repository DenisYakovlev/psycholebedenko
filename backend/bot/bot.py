from django.conf import settings
import telebot
from telebot.types import ReplyKeyboardMarkup, KeyboardButton
import logging

logger = logging.getLogger('bot_logs')

token = settings.TELEGRAM_BOT_API_KEY
admin_id = settings.ADMIN_ID

bot = telebot.TeleBot(token)

@bot.message_handler(commands=['start', 'test'])
def start_message(message):
	markup = ReplyKeyboardMarkup(resize_keyboard=True)
	markup.row("hui", "pizda")
	logger.debug("test call")
	bot.send_message(message.from_user.id, "hello", reply_markup=markup)


@bot.message_handler(regexp="hui")
def response(message):
	bot.send_message(message.from_user.id, "da")