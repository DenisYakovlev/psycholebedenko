from django.conf import settings
import telebot
import json

token = settings.TELEGRAM_BOT_API_KEY
bot = telebot.TeleBot(token)

@bot.message_handler(commands=['start'])
def start_message(message):
	bot.send_message(message.chat.id, 'hello' + str(message.chat.id))

@bot.message_handler(commands=['test'])
def test_message(message):
	bot.send_message(message.chat.id,'Test')
    
@bot.message_handler()
def greetings_message(id, name):
    bot.send_message(id, f"Hello, {name}")
    
@bot.message_handler()
def send_test(id, data):
	bot.send_message(id, str(data))


@bot.message_handler()
def test_rabbit():
	admin_id = 820543856
	bot.send_message(admin_id, "rabbit is working")
    