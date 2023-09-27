from datetime import datetime
import pytz
import telebot
from telebot.types import Contact
from channels.layers import get_channel_layer
from django.core.cache import cache
from django.conf import settings
from celery import shared_task

from . import TOKEN, logger
from authorization.utils import generatePhoneVerificationTokens
from asgiref.sync import async_to_sync
from user.models import TelegramUser
from user.serializers import TelegramUserSerializer
from .markups import gen_menu_markup, gen_settings_markup, phone_verification_markup
from dotenv import load_dotenv
import os
import hmac
import hashlib

load_dotenv('./.env.dev')


bot = telebot.TeleBot(TOKEN)


@bot.message_handler(commands=['start'])
def botDrivenAuthorization(message):
	# phone verification process should start after this message
	logger.debug("botDrivenAuthorization")

	user_data = message.from_user.to_dict()
	serializer = TelegramUserSerializer(data=user_data)

	if serializer.is_valid():
		# save user data if it's his first visit to app

		serializer.save()

		bot.send_message(
			chat_id=message.chat.id, 
			text="saved",
			reply_markup=gen_menu_markup(message.chat.id)
		)
	else:
		# id error occurs if user is already authorized.
		# handle greetings of already authorized user.

		bot.send_message(
			chat_id=message.chat.id, 
			text="not saved", 
			reply_markup=gen_menu_markup(message.chat.id)
		)


def webAppDrivenAuthorization(user_id, first_name, first_authorization=True):
	# notify user about his first authorization. All his auth data is already saved in db
	# phone verification process should start after this message
	logger.debug("webAppDrivenAuthorization")

	if first_authorization:
		bot.send_message(user_id, f"hello, {first_name}, first", reply_markup=gen_menu_markup(user_id))


@shared_task
def handlePhoneVerification(user_id, wsToken, confirmToken, forceStart=False):
	# forceStart omits token check. Used in phone verification restart
	logger.debug("handlePhoneVerification")

	if not forceStart:
		# check if token already exists and doesn't need to refresh
		token = cache.get(wsToken)

		if token:
			return

	bot.send_message(user_id, "Надайте номер телефона", reply_markup=phone_verification_markup)

	# set up timestamps of start and timeout of verification
	tz = pytz.timezone(settings.TIME_ZONE)
	verification_start = int(datetime.now(tz=tz).timestamp())
	verification_end = verification_start + settings.PHONE_VERIFICATION_TIMEOUT_SECS

	cache.set(wsToken, confirmToken, settings.PHONE_VERIFICATION_TIMEOUT_SECS)
	return verification_start, verification_end


@bot.message_handler(content_types=['contact']) 
def handle_contact(message):	
	logger.debug('handle_contact')

	# handle errors
	if message.contact is None:
		bot.send_message(message.chat.id, "No contact", reply_markup=phone_verification_markup)
		return
	if message.chat.id != message.contact.user_id:
		bot.send_message(message.chat.id, "Incorrect phone number", reply_markup=phone_verification_markup)
		return
	if not TelegramUser.objects.filter(id=message.contact.user_id).exists():
		bot.send_message(message.chat.id, "User does not exists", reply_markup=phone_verification_markup)
		return
	
	user = TelegramUser.objects.get(id=message.contact.user_id)
	wsToken, confirmToken = generatePhoneVerificationTokens(message.contact.user_id, user.auth_date)

	# verify token 
	try:
		cached_confirmToken = cache.get(wsToken)

		if confirmToken != cached_confirmToken:
			bot.send_message(message.chat.id, "Wrong token")
			return 
	except:
		bot.send_message(message.chat.id, "Timeout/Verification is not started", reply_markup=gen_menu_markup(message.chat.id))
		return 

	phone_number = message.contact.phone_number

	data = {
		"id": user.id,
		"phone_number": phone_number if phone_number.startswith('+') else '+' + phone_number
	}

	serializer = TelegramUserSerializer(instance=user, data=data, partial=True)
	
	if serializer.is_valid():
		serializer.save()

		# notify client that phone number was verified and saved
		room_group_name = f"phone_verification_{wsToken}"
		channel_layer = get_channel_layer()

		async_to_sync(channel_layer.group_send)(
			room_group_name, 
			{
				"type": "client_message",
				"message": {
					"state": "connected",
					"confirmToken": confirmToken
				}
			}
		)

		bot.send_message(message.chat.id, "all good", reply_markup=phone_verification_markup)
	else:
		bot.send_message(message.chat.id, f"error ocured: {serializer.errors}", reply_markup=phone_verification_markup)


@bot.message_handler(regexp="⚙️ Налаштування")
def settings(message):
	user = TelegramUser.objects.get(id=message.from_user.id)

	response = f"id: {user.id}\nphone: {user.phone_number}\nnotifications: {user.notifications_on}"

	bot.send_message(message.from_user.id, response, reply_markup=gen_settings_markup(message.from_user.id))


@bot.message_handler(regexp="📇 Меню")
def menu(message):
	bot.send_message(message.from_user.id, "Головне меню", reply_markup=gen_menu_markup(message.from_user.id))

@bot.message_handler(regexp="test_bug")
def test_bug(message):
	webapp_url = os.getenv("BOT_WEB_APP_URL")
	user_id = message.from_user.id
	hash = hmac.new(settings.TELEGRAM_BOT_API_KEY.encode(), str(user_id).encode(), hashlib.sha256).hexdigest()

	bot.send_message(message.from_user.id, f"{webapp_url}/appointment/create?id={user_id}&hash={hash}", reply_markup=gen_menu_markup(message.from_user.id))

@bot.message_handler(commands=["phone_test"])
def response(message):
	bot.send_message(message.from_user.id, "phone_markup", reply_markup=phone_verification_markup)

@bot.message_handler(commands=["menu_test"])
def response(message):
	bot.send_message(message.from_user.id, "menu_markup", reply_markup=gen_menu_markup(message.chat.id))


@bot.message_handler(commands=['test'])
def test(message):
	bot.send_message(message.from_user.id, "test")