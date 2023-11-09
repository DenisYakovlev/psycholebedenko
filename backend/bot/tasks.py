import pytz
import json
from datetime import datetime
from telebot.types import InlineKeyboardButton, InlineKeyboardMarkup

from celery import shared_task
from django.conf import settings
from django.core.cache import cache

from . import logger
from .bot import bot
from .utils import format_date, format_status
from .messages import MessageBuilder
from .markups import gen_menu_markup, phone_verification_markup
from appointment.models import Appointment
from user.models import TelegramUser
from event.models import Event


@shared_task
def webAppDrivenAuthorization(user_id, first_name, first_authorization=True):
	# notify user about his first authorization. All his auth data is already saved in db
	# phone verification process should start after this message
	logger.debug("webAppDrivenAuthorization")

	if first_authorization:
		bot.send_message(
			user_id, 
			MessageBuilder.start(first_name, settings.ADMIN_ID), 
			reply_markup=gen_menu_markup(user_id), 
			parse_mode="Markdown"
		)
		

@shared_task
def handlePhoneVerification(user_id, wsToken, confirmToken, forceStart=False):
	# forceStart omits token check. Used in phone verification restart
	logger.debug("handlePhoneVerification")

	if not forceStart:
		# check if token already exists and doesn't need to refresh
		token = cache.get(wsToken)

		if token:
			return

	bot.send_message(
		user_id, 
		MessageBuilder.phone_verification(), 
		reply_markup=phone_verification_markup, 
		parse_mode="Markdown"
	)

	# remove verification dates for now
	#
	# set up timestamps of start and timeout of verification
	# tz = pytz.timezone(settings.TIME_ZONE)
	# verification_start = int(datetime.now(tz=tz).timestamp())
	# verification_end = verification_start + settings.PHONE_VERIFICATION_TIMEOUT_SECS

	cache.set(wsToken, confirmToken, settings.PHONE_VERIFICATION_TIMEOUT_SECS)
	# return verification_start, verification_end


@shared_task
def handleAppointmentUpdateNotification(appointment_id):
	logger.debug("handleAppointmentUpdateNotification")
	
	appointment = Appointment.objects.get(id=appointment_id)

	if appointment.status == Appointment.Status.DENIED:
		if appointment.user.notifications_on:
			bot.send_message(
				appointment.user.id, 
				MessageBuilder.appointment_cancel(appointment.title), 
				parse_mode="Markdown"
			)

		bot.send_message(
			settings.ADMIN_ID, 
			MessageBuilder.appointment_cancel(appointment.title), 
			parse_mode="Markdown",
			reply_markup=InlineKeyboardMarkup([
			[InlineKeyboardButton(text='Написати користувачу', url=f'tg://user?id={appointment.user.id}')],
			[InlineKeyboardButton(text='Відкрити у панелі', url=f'https://psycholebedenko.online/admin/appointments/?state=0&user={appointment.user.id}')],
    	]))

		return

	user = TelegramUser.objects.get(id=appointment.user)
	formated_date = format_date(appointment.date.date)

	response_user = MessageBuilder.appointment_update_user(
		appointment.title,
		appointment.online,
		format_status(appointment.status),
		formated_date,
		appointment.address,
		appointment.zoom_link
	)

	response_admin = MessageBuilder.appointment_update_admin(
		appointment.title,
		appointment.online,
		format_status(appointment.status),
		formated_date,
		user.first_name,
		appointment.address,
		appointment.zoom_link
	)

	if user.notifications_on:
		bot.send_message(user.id, response_user, parse_mode="Markdown")

	bot.send_message(settings.ADMIN_ID, response_admin, parse_mode="Markdown",
		reply_markup=InlineKeyboardMarkup([
        [InlineKeyboardButton(text='Написати користувачу', url=f'tg://user?id={user.id}')],
        [InlineKeyboardButton(text='Відкрити у панелі', url=f'https://psycholebedenko.online/admin/appointments/?state=0&user={user.id}')],
    ]))
	

@shared_task
def handleAppointmentScheduledNotification(appointment_id):
	logger.debug("handleAppointmentScheduledNotification")	

	appointment = Appointment.objects.get(id=appointment_id)
	formated_date = format_date(appointment.date.date)

	response_user = MessageBuilder.appointment_schedule_user(
		appointment.title,
		appointment.online,
		formated_date,
		appointment.address,
		appointment.zoom_link
	)

	response_admin = MessageBuilder.appointment_schedule_admin(
		appointment.title,
		appointment.online,
		formated_date,
		appointment.user.first_name,
		appointment.address,
		appointment.zoom_link
	)

	if appointment.user.notifications_on:
		bot.send_message(appointment.user.id, response_user, parse_mode="Markdown")

	bot.send_message(settings.ADMIN_ID, response_admin, parse_mode="Markdown",
		reply_markup=InlineKeyboardMarkup([
        [InlineKeyboardButton(text='Написати користувачу', url=f'tg://user?id={appointment.user.id}')],
		[InlineKeyboardButton(text='Помітити як виконану', callback_data=json.dumps({
			"action": "complete_appointment",
			"data": appointment_id
		}))],
        [InlineKeyboardButton(text='Відкрити у панелі', url=f'https://psycholebedenko.online/admin/appointments/?state=0&user={appointment.user.id}')],
    ]))
	

@shared_task
def handleEventNotification(event_id, user_id):
	logger.debug("handleEventNotification")

	event = Event.objects.get(id=event_id)
	formated_date = format_date(event.date)

	bot.send_message(
		user_id, 
		MessageBuilder.event_schedule(event.title, formated_date, event.address, event.zoom_link), 
		parse_mode="Markdown"
	)
	

@shared_task
def handleAppointmentCreateNotification(appointment_id):
	logger.debug("handleAppointmentCreateNotification")

	appointment = Appointment.objects.get(id=appointment_id)

	user = TelegramUser.objects.get(id=appointment.user)
	formated_date = format_date(appointment.date.date)

	user_response = MessageBuilder.appointment_create_user(
		appointment.title,
		appointment.online,
		formated_date,
		appointment.address,
	)

	admin_response = MessageBuilder.appointment_create_admin(
		appointment.title,
		appointment.online,
		formated_date,
		user.first_name,
		appointment.address,
	)

	if user.notifications_on:
		bot.send_message(user.id, user_response, parse_mode="Markdown")

	bot.send_message(settings.ADMIN_ID, admin_response, parse_mode="Markdown",
		reply_markup=InlineKeyboardMarkup([
        [InlineKeyboardButton(text='Написати користувачу', url=f'tg://user?id={user.id}')],
		[InlineKeyboardButton(text='Підтвердити/створити лінк у Zoom', callback_data=json.dumps({
			"action": "activate_appointment",
			"data": appointment_id
		}))],
        [InlineKeyboardButton(text='Відкрити у панелі', url=f'https://psycholebedenko.online/admin/appointments/?state=0&status=pending&user={user.id}')],
    ]))
	

@shared_task
def handleAppointmentCreateByAdminNotification(appointment_id):
	logger.debug("handleAppointmentCreateByAdminNotification")

	appointment = Appointment.objects.get(id=appointment_id)

	user = TelegramUser.objects.get(id=appointment.user)
	formated_date = format_date(appointment.date.date)

	response_user = MessageBuilder.appointment_admin_create_user(
		appointment.title,
		appointment.online,
		formated_date,
		appointment.address,
		appointment.zoom_link
	)

	response_admin = MessageBuilder.appointment_admin_create_admin(
		appointment.title,
		appointment.online,
		formated_date,
		user.first_name,
		appointment.address,
		appointment.zoom_link
	)

	if user.notifications_on:
		bot.send_message(user.id, response_user, parse_mode="Markdown")

	bot.send_message(settings.ADMIN_ID, response_admin, parse_mode="Markdown",
		reply_markup=InlineKeyboardMarkup([
        [InlineKeyboardButton(text='Написати користувачу', url=f'tg://user?id={user.id}')],
        [InlineKeyboardButton(text='Відкрити у панелі', url=f'https://psycholebedenko.online/admin/appointments/?state=0&user={user.id}')],
    ]))