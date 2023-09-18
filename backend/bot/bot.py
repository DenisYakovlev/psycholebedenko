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
from .markups import menu_markup, phone_verification_markup

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
			reply_markup=menu_markup
		)
	else:
		# id error occurs if user is already authorized.
		# handle greetings of already authorized user.

		bot.send_message(
			chat_id=message.chat.id, 
			text="not saved", 
			reply_markup=menu_markup
		)


def webAppDrivenAuthorization(user_id, first_name, first_authorization=True):
	# notify user about his first authorization. All his auth data is already saved in db
	# phone verification process should start after this message
	logger.debug("webAppDrivenAuthorization")

	if first_authorization:
		bot.send_message(user_id, f"hello, {first_name}, first", reply_markup=menu_markup)


@shared_task
def handlePhoneVerification(user_id, wsToken, confirmToken, forceStart=False):
	logger.debug("handlePhoneVerification")

	if not forceStart:
		# check if token already exists and doesn't need to refresh
		token = cache.get(wsToken)

		if token and not forceStart:
			return

	cache.set(wsToken, confirmToken, settings.PHONE_VERIFICATION_TIMEOUT_SECS)
	bot.send_message(user_id, "Надайте номер телефона", reply_markup=phone_verification_markup)


@bot.message_handler(content_types=['contact']) 
def handle_contact(message):	
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
		bot.send_message(message.chat.id, "Timeout", reply_markup=menu_markup)
		return 

	data = {
		"id": user.id,
		"phone_number": message.contact.phone_number
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
		bot.send_message(message.chat.id, "error ocured", reply_markup=phone_verification_markup)

@bot.message_handler(regexp="hui")
def response(message):
	bot.send_message(message.from_user.id, "da")
