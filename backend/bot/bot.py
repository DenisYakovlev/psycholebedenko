from datetime import datetime
import re
import json
import pytz
import telebot
from telebot.types import Message, Chat
from channels.layers import get_channel_layer
from django.core.cache import cache
from django.conf import settings
from django.db import transaction
from django.utils.timezone import make_aware, now

from . import TOKEN, logger
from .utils import format_date, format_status
from authorization.utils import generatePhoneVerificationTokens
from asgiref.sync import async_to_sync
from user.models import TelegramUser
from user.serializers import TelegramUserSerializer
from appointment.models import Appointment
from appointment.serializers import AppointmentCreateSerializer
from appointment.tasks import create_appointment_zoom_link, create_zoom_link
from event.models import Event, Participation
from schedule.models import Schedule
from .markups import gen_menu_markup, gen_settings_markup, phone_verification_markup
from .messages import MessageBuilder
from .filters import IsAdmin


bot = telebot.TeleBot(TOKEN)
bot.add_custom_filter(IsAdmin())


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
			message.chat.id, 
			MessageBuilder.start(message.from_user.first_name, settings.ADMIN_ID), 
			reply_markup=gen_menu_markup(message.chat.id), 
			parse_mode="Markdown"
		)
	else:
		# id error occurs if user is already authorized.
		# handle greetings of already authorized user.

		bot.send_message(
			message.chat.id, 
			MessageBuilder.welcome_back(message.from_user.first_name, settings.ADMIN_ID), 
			reply_markup=gen_menu_markup(message.chat.id), 
			parse_mode="Markdown"
		)


@bot.callback_query_handler(func=lambda call: True)
def handle_query(call):
	logger.debug("callback handle")

	callback = json.loads(call.data)

	from .tasks import handleAppointmentUpdateNotification

	if callback["action"] == "activate_appointment":
		appointment = Appointment.objects.get(id=callback["data"])

		link = create_appointment_zoom_link(appointment.id)

		_data = {"status": "appointed", "zoom_link": link}

		serializer = AppointmentCreateSerializer(instance=appointment, data=_data, partial=True)
		
		if serializer.is_valid():
			obj = serializer.save()

			handleAppointmentUpdateNotification.delay(obj.id)
			return

		bot.send_message(settings.ADMIN_ID, f"errors: {serializer.errors}", parse_mode="Markdown")

	elif callback["action"] == "complete_appointment":
		appointment = Appointment.objects.get(id=callback["data"])

		_data = {"status": "complete"}

		serializer = AppointmentCreateSerializer(instance=appointment, data=_data, partial=True)

		if serializer.is_valid():
			obj = serializer.save()

			handleAppointmentUpdateNotification.delay(obj.id)
			return
		
		bot.send_message(settings.ADMIN_ID, f"errors: {serializer.errors}", parse_mode="Markdown")
	

@bot.message_handler(content_types=['contact']) 
def handle_contact(message):	
	logger.debug('handle_contact')

	# handle errors
	if message.contact is None:
		bot.send_message(message.chat.id, MessageBuilder.phone_no_contact(), reply_markup=phone_verification_markup, parse_mode="Markdown")
		return
	if message.chat.id != message.contact.user_id:
		bot.send_message(message.chat.id, MessageBuilder.phone_wrong_contact(), reply_markup=phone_verification_markup, parse_mode="Markdown")
		return
	if not TelegramUser.objects.filter(id=message.contact.user_id).exists():
		bot.send_message(message.chat.id, MessageBuilder.phone_user_error(), reply_markup=phone_verification_markup, parse_mode="Markdown")
		return
	
	
	user = TelegramUser.objects.get(id=message.contact.user_id)
	wsToken, confirmToken = generatePhoneVerificationTokens(message.contact.user_id, user.auth_date)

	error_response = MessageBuilder.phone_error()
	server_error = lambda error: MessageBuilder.phone_server_error(error)
	good_response = MessageBuilder.phone_ok()


	# verify token 
	try:
		cached_confirmToken = cache.get(wsToken)

		if confirmToken != cached_confirmToken:
			bot.send_message(user.id, error_response, reply_markup=gen_settings_markup(user.id), parse_mode="Markdown")
			return 
	except:
		bot.send_message(user.id, error_response, reply_markup=gen_settings_markup(user.id), parse_mode="Markdown")
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

		bot.send_message(user.id, good_response, reply_markup=gen_settings_markup(user.id), parse_mode="Markdown")
	else:
		bot.send_message(user.id, server_error(str(serializer.errors)), reply_markup=phone_verification_markup, parse_mode="Markdown")


@bot.message_handler(regexp="⚙️ Налаштування")
def _settings(message):
	logger.debug("settings")
	user = TelegramUser.objects.get(id=message.from_user.id)

	_response = MessageBuilder.settings(
		user.first_name,
		user.phone_number,
		user.notifications_on
	)

	bot.send_message(message.from_user.id, _response, reply_markup=gen_settings_markup(message.from_user.id), parse_mode="Markdown")


@bot.message_handler(regexp="⏮ Меню")
def menu(message):
	logger.debug("menu")
	
	response = MessageBuilder.menu()

	bot.send_message(message.from_user.id, response, reply_markup=gen_menu_markup(message.chat.id))


@bot.message_handler(regexp="🔴 Вимкнути оповіщення")
def notifications_off(message):
	logger.debug("notification off")

	user = TelegramUser.objects.get(id=message.chat.id)
	serializer = TelegramUserSerializer(user, data={"notifications_on": False}, partial=True)

	if serializer.is_valid():
		serializer.save()

		response = MessageBuilder.notifications_off()

		bot.send_message(user.id, response, reply_markup=gen_settings_markup(user.id), parse_mode="Markdown")
		return

	response = MessageBuilder.error()

	bot.send_message(user.id, response, reply_markup=gen_settings_markup(user.id), parse_mode="Markdown")


@bot.message_handler(regexp="🟢 Включити оповіщення")
def notifications_on(message):
	logger.debug("notifications on")

	user = TelegramUser.objects.get(id=message.chat.id)
	serializer = TelegramUserSerializer(user, data={"notifications_on": True}, partial=True)

	if serializer.is_valid():
		serializer.save()

		response = MessageBuilder.notifications_on()
		
		bot.send_message(user.id, response, reply_markup=gen_settings_markup(user.id), parse_mode="Markdown")
		return

	response = MessageBuilder.error()

	bot.send_message(user.id, response, reply_markup=gen_settings_markup(user.id), parse_mode="Markdown")


@bot.message_handler(regexp="📞 Оновити номер телефона")
def phone_update(message):
	logger.debug("phone update")
	user = TelegramUser.objects.get(id=message.chat.id)

	try:
		wsToken, confirmToken = generatePhoneVerificationTokens(user.id, user.auth_date)
		cache.set(wsToken, confirmToken, settings.PHONE_VERIFICATION_TIMEOUT_SECS)
	
		response = MessageBuilder.phone_update()

		bot.send_message(user.id, response, reply_markup=phone_verification_markup, parse_mode="Markdown")
		return
	except:
		response = MessageBuilder.error()

		bot.send_message(user.id, response, reply_markup=gen_settings_markup(user.id), parse_mode="Markdown")


@bot.message_handler(regexp="📞 Надати номер телефона")
def phone_set(message):
	phone_update(message)


@bot.message_handler(regexp="📑 Повна інформація")
def full_info(message):
	_settings(message)

@bot.message_handler(regexp="👨🏻‍💻 Написати психологу")
def write_to_admin(message):
	admin = TelegramUser.objects.get(id=settings.ADMIN_ID)

	bot.send_contact(message.chat.id, admin.phone_number, admin.first_name, admin.last_name, reply_markup=gen_menu_markup(message.chat.id))


@bot.business_message_handler(commands=["сайт"])
def website_link(message: Message) -> None:
	bot.send_photo(
		chat_id=message.chat.id,
		business_connection_id=message.business_connection_id,
		photo="https://psycholebedenko-backend.s3.amazonaws.com/event_img_4.jpg",
		caption=MessageBuilder.site_link(),
		parse_mode="Markdown"
	)

@bot.business_message_handler(commands=["бот"])
def bot_link(message: Message) -> None:
	bot.send_photo(
		chat_id=message.chat.id,
		business_connection_id=message.business_connection_id,
		caption=MessageBuilder.bot_link(),
		photo="https://psycholebedenko-backend.s3.amazonaws.com/event_img_4.jpg",
		parse_mode="Markdown",
	)

@bot.business_message_handler(regexp="/записати", is_admin=True)
@transaction.atomic
def business_appointment(message: Message) -> None:
	pattern = r'^/записати\s(онлайн)\s(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2})$'
	match = re.match(pattern, message.text)

	# validate command
	if not match:
		return bot.send_message(
			chat_id=message.chat.id,
			business_connection_id=message.business_connection_id,
			text=MessageBuilder.appointment_comand_error(),
			parse_mode="Markdown"
		)
	
	format, date, time = match.group(1), match.group(2), match.group(3)

	# validate/create date for new appointment
	try:
		schedule_obj = make_aware(datetime.fromisoformat(date + "T" + time), pytz.timezone(settings.TIME_ZONE))
	except:
		return bot.send_message(
			chat_id=message.chat.id,
			business_connection_id=message.business_connection_id,
			text=MessageBuilder.appointment_comand_error(),
			parse_mode="Markdown"
		)
	
	schedule = Schedule.objects.filter(date=schedule_obj).first()

	# validate/create schedule object for new appointment
	if not schedule:
		schedule = Schedule.objects.create(date=schedule_obj)
	elif schedule and Appointment.objects.filter(date=schedule.id):
		return bot.send_message(
			chat_id=message.chat.id,
			business_connection_id=message.business_connection_id,
			text=MessageBuilder.appointment_date_error(),
			parse_mode="Markdown"
		)
	
	user = TelegramUser.objects.filter(id=message.chat.id).first()

	# validate/create user object for new appointment
	if not user:
		chat_obj: Chat = message.chat
		user = TelegramUser.objects.create(
			id=chat_obj.id,
			first_name=chat_obj.first_name,
			last_name=chat_obj.last_name,
			username=chat_obj.username
		)

	appointment = Appointment.objects.create(
		user=user,
		date=schedule,
		online=format == "online",
		status=Appointment.Status.APPOINTED
	)

	# notify that in process
	bot.send_message(
		chat_id=message.chat.id,
		business_connection_id=message.business_connection_id,
		text=MessageBuilder.appointment_bot_create_pre(message.chat.first_name),
		parse_mode="Markdown"
	)

	zoom_link = create_appointment_zoom_link(appointment.id)

	serializer = AppointmentCreateSerializer(instance=appointment, data={"zoom_link": zoom_link}, partial=True)
	
	if serializer.is_valid():
		serializer.save()
		formated_date = format_date(schedule_obj)

		return bot.send_message(
			chat_id=message.chat.id,
			business_connection_id=message.business_connection_id,
			text=MessageBuilder.appointment_bot_create(
				title=appointment.title, 
				online=True, 
				formated_date=formated_date, 
				first_name=user.first_name, 
				address=appointment.address,
				zoom_link=zoom_link
			),
			parse_mode="Markdown"
		)

	bot.send_message(settings.ADMIN_ID, f"errors: {serializer.errors}", parse_mode="Markdown")

@bot.business_message_handler(regexp="/ознайомлення", is_admin=True)
def first_appointment(message: Message) -> None:
	pattern = r'^/ознайомлення\s(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2})$'
	match = re.match(pattern, message.text)

	# validate command
	if not match:
		return bot.send_message(
			chat_id=message.chat.id,
			business_connection_id=message.business_connection_id,
			text=MessageBuilder.appointment_comand_error(),
			parse_mode="Markdown"
		)
	
	date, time = match.group(1), match.group(2)

	# validate/create date
	try:
		schedule_obj = make_aware(datetime.fromisoformat(date + "T" + time), pytz.timezone(settings.TIME_ZONE))
	except:
		return bot.send_message(
			chat_id=message.chat.id,
			business_connection_id=message.business_connection_id,
			text=MessageBuilder.appointment_comand_error(),
			parse_mode="Markdown"
		)
	
	schedule = Schedule.objects.filter(date=schedule_obj).first()

	if schedule and Appointment.objects.filter(date=schedule.id):
		return bot.send_message(
			chat_id=message.chat.id,
			business_connection_id=message.business_connection_id,
			text=MessageBuilder.appointment_date_error(),
			parse_mode="Markdown"
		)
	
	bot.send_message(
		chat_id=message.chat.id,
		business_connection_id=message.business_connection_id,
		text=MessageBuilder.first_appointment_create_pre(message.chat.first_name),
		parse_mode="Markdown"
	)
	
	zoom_link = create_zoom_link(schedule_obj)
	formated_date = format_date(schedule_obj)

	return bot.send_message(
			chat_id=message.chat.id,
			business_connection_id=message.business_connection_id,
			text=MessageBuilder.first_appointment_create(
				formated_date=formated_date, 
				first_name=message.chat.first_name, 
				zoom_link=zoom_link
			),
			parse_mode="Markdown"
		)



@bot.business_message_handler(regexp="/запис відмінити", is_admin=True)
def decline_closest_appointment(message: Message) -> None:
	try:
		appointment = Appointment.active.filter(date__date__gt=now(), user=message.chat.id).first()

		appointment.status = Appointment.Status.DENIED
		appointment.date = None
		appointment.save()

		bot.send_message(
			chat_id=message.chat.id,
			business_connection_id=message.business_connection_id,
			text=MessageBuilder.appointment_bot_closest_decline(appointment.title),
			parse_mode="Markdown"
		)
	except Exception as e:
		bot.send_message(
			chat_id=message.chat.id,
			business_connection_id=message.business_connection_id,
			text=MessageBuilder.appointment_bot_closest_not_exist(),
			parse_mode="Markdown"
		)

@bot.business_message_handler(regexp="/запис завершити", is_admin=True)
def complete_closest_appointment(message: Message) -> None:
	try:
		appointment = Appointment.active.filter(date__date__gt=now(), user=message.chat.id).first()

		appointment.status = Appointment.Status.COMPLETE
		appointment.save()

		bot.send_message(
			chat_id=message.chat.id,
			business_connection_id=message.business_connection_id,
			text=MessageBuilder.appointment_bot_closest_complete(appointment.title),
			parse_mode="Markdown"
		)
	except Exception as e:
		bot.send_message(
			chat_id=message.chat.id,
			business_connection_id=message.business_connection_id,
			text=MessageBuilder.appointment_bot_closest_not_exist(),
			parse_mode="Markdown"
		)

@bot.business_message_handler(regexp="/запис оновити", is_admin=True)
def complete_closest_appointment(message: Message) -> None:
	try:
		appointment = Appointment.active.filter(date__date__gt=now(), user=message.chat.id).first()

		zoom_link = create_appointment_zoom_link(appointment.id)
		appointment.save()

		bot.send_message(
			chat_id=message.chat.id,
			business_connection_id=message.business_connection_id,
			text=MessageBuilder.appointment_bot_closest_new_link(appointment.title, zoom_link),
			parse_mode="Markdown"
		)
	except Exception as e:
		bot.send_message(
			chat_id=message.chat.id,
			business_connection_id=message.business_connection_id,
			text=MessageBuilder.appointment_bot_closest_not_exist(),
			parse_mode="Markdown"
		)

@bot.business_message_handler(regexp="/запис")
def closest_appointment(message: Message) -> None:
	try:
		appointment = Appointment.active.filter(date__date__gt=now(), user=message.chat.id).first()
		formated_date = format_date(appointment.date.date)

		bot.send_message(
			chat_id=message.chat.id,
			business_connection_id=message.business_connection_id,
			text=MessageBuilder.appointment_bot_closest(
				title=appointment.title, 
				online=True, 
				formated_date=formated_date, 
				first_name=message.chat.first_name, 
				address=appointment.address,
				zoom_link=appointment.zoom_link
			),
			parse_mode="Markdown"
		)
	except:
		bot.send_message(
			chat_id=message.chat.id,
			business_connection_id=message.business_connection_id,
			text=MessageBuilder.appointment_bot_closest_not_exist(),
			parse_mode="Markdown"
		)