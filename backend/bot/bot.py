from datetime import datetime
import pytz
import telebot
from telebot.types import InlineKeyboardButton, InlineKeyboardMarkup
from channels.layers import get_channel_layer
from django.core.cache import cache
from django.conf import settings
from django.utils.timezone import make_aware
from celery import shared_task

from . import TOKEN, logger, month_names, day_names
from authorization.utils import generatePhoneVerificationTokens
from asgiref.sync import async_to_sync
from user.models import TelegramUser
from user.serializers import TelegramUserSerializer
from appointment.models import Appointment
from appointment.serializers import AppointmentCreateSerializer
from appointment.tasks import create_appointment_zoom_link
from schedule.models import Schedule
from .markups import gen_menu_markup, gen_settings_markup, phone_verification_markup


bot = telebot.TeleBot(TOKEN)


# refactor to utils
def format_date(date):
	tz = pytz.timezone(settings.TIME_ZONE)
	_date = date.astimezone(tz)

	day_name = day_names[_date.weekday()]
	month_name = month_names[_date.month]
	time = _date.strftime("%H:%M")

	return f"{day_name}, {_date.day} {month_name} О {time}"

def format_status(status):
	formated_status = {
		"pending": "🟡 в обробці",
		"appointed": "🟢 назначено",
		"complete": "🔵 виконано",
		"denied": "🔴 відмінено"
	}

	return formated_status[status]


# NEED TO REFACTOR ALL THIS

@bot.message_handler(commands=['start'])
def botDrivenAuthorization(message):
	# phone verification process should start after this message
	logger.debug("botDrivenAuthorization")

	user_data = message.from_user.to_dict()
	serializer = TelegramUserSerializer(data=user_data)

	response= \
	f"""
	*🎉 Вітаємо, {message.from_user.first_name}! 🎉*

	Ви авторизувались у веб-застосунку практикуючого
	психолога [Лянного Андрія](tg://user?id={settings.ADMIN_ID}).

	Всі ваші записи та налаштування акаунта можна 
	переглянути через панель керування бота.
	Нажміть на *меню* щоб відрити веб-застосунок.
	"""

	response_welcome_back= \
	f"""
	*🎉 З поверненням, {message.from_user.first_name}! 🎉*

	Ви авторизувались у веб-застосунку практикуючого
	психолога [Лянного Андрія](tg://user?id={settings.ADMIN_ID}).

	Всі ваші записи та налаштування акаунта можна 
	переглянути через панель керування бота.
	Нажміть на *меню* щоб відрити веб-застосунок.
	"""

	if serializer.is_valid():
		# save user data if it's his first visit to app

		serializer.save()

		bot.send_message(message.chat.id, response, reply_markup=gen_menu_markup(message.chat.id), parse_mode="Markdown")
	else:
		# id error occurs if user is already authorized.
		# handle greetings of already authorized user.

		bot.send_message(message.chat.id, response_welcome_back, reply_markup=gen_menu_markup(message.chat.id), parse_mode="Markdown")


@shared_task
def webAppDrivenAuthorization(user_id, first_name, first_authorization=True):
	# notify user about his first authorization. All his auth data is already saved in db
	# phone verification process should start after this message
	logger.debug("webAppDrivenAuthorization")

	response= \
	f"""
	*🎉 Вітаємо, {first_name}! 🎉*

	Ви авторизувались у веб-застосунку практикуючого
	психолога [Лянного Андрія](tg://user?id={settings.ADMIN_ID}).

	Всі ваші записи та налаштування акаунта можна 
	переглянути через панель керування бота.
	Нажміть на *меню* щоб відрити веб-застосунок.
	"""

	if first_authorization:
		bot.send_message(user_id, response, reply_markup=gen_menu_markup(user_id), parse_mode="Markdown")


@shared_task
def handlePhoneVerification(user_id, wsToken, confirmToken, forceStart=False):
	# forceStart omits token check. Used in phone verification restart
	logger.debug("handlePhoneVerification")

	if not forceStart:
		# check if token already exists and doesn't need to refresh
		token = cache.get(wsToken)

		if token:
			return
		
	response = \
	f"""
	*📞 Надання номера телефона*

	
	Надайте номер телефона через меню. ⬇️⬇️⬇️

	*
	Через 5 хвилин, активація стане недоступною.
	При помилці/труднощах, зверніться до психолога.
	*
	"""

	bot.send_message(user_id, response, reply_markup=phone_verification_markup, parse_mode="Markdown")

	# set up timestamps of start and timeout of verification
	tz = pytz.timezone(settings.TIME_ZONE)
	verification_start = int(datetime.now(tz=tz).timestamp())
	verification_end = verification_start + settings.PHONE_VERIFICATION_TIMEOUT_SECS

	cache.set(wsToken, confirmToken, settings.PHONE_VERIFICATION_TIMEOUT_SECS)
	return verification_start, verification_end


@shared_task
def handleAppointmentUpdateNotification(appointment_id):
	logger.debug("handleAppointmentUpdateNotification")
	
	appointment = Appointment.objects.get(id=appointment_id)

	if appointment.status == Appointment.Status.DENIED:
		response = \
		f"""
		*📝 {appointment.title}*

		Консультація була відмінена
		"""

		bot.send_message(appointment.user.id, response, parse_mode="Markdown")
		bot.send_message(settings.ADMIN_ID, response, parse_mode="Markdown",
			reply_markup=InlineKeyboardMarkup([
			[InlineKeyboardButton(text='Написати користувачу', url=f'tg://user?id={appointment.user.id}')],
			[InlineKeyboardButton(text='Відкрити у панелі', url=f'https://psycholebedenko.online/admin/appointments/?state=0&user={appointment.user.id}')],
    	]))

		return

	user = TelegramUser.objects.get(id=appointment.user)
	formated_date = format_date(appointment.date.date)

	response_user = \
	f"""
	*📝 {appointment.title}*

	
	Дані про вашу консультацію були оновлені

	📡 Формат: *{"Онлайн" if appointment.online else "Офлайн"}*
	📍 Місце проведення: {f"*{appointment.address}*" if appointment.address else f"[Міт у Zoom]({appointment.zoom_link})"}
	📌 Статус: *{format_status(appointment.status)}*
	🗓 Дата: *{formated_date}*
	"""

	response_admin = \
	f"""
	*📝 {appointment.title}*

	
	Дані про консультацію були оновлені

	📡 Формат: *{"Онлайн" if appointment.online else "Офлайн"}*
	📍 Місце проведення: {f"*{appointment.address}*" if appointment.address else f"[Міт у Zoom]({appointment.zoom_link})"}
	📌 Статус: *{format_status(appointment.status)}*
	🗓 Дата: *{formated_date}*
	👤 Користувач: *{user.first_name}*
	"""

	bot.send_message(user.id, response_user, parse_mode="Markdown")
	bot.send_message(settings.ADMIN_ID, response_admin, parse_mode="Markdown",
		reply_markup=InlineKeyboardMarkup([
        [InlineKeyboardButton(text='Написати користувачу', url=f'tg://user?id={user.id}')],
        [InlineKeyboardButton(text='Відкрити у панелі', url=f'https://psycholebedenko.online/admin/appointments/?state=0&user={user.id}')],
    ]))
	

@shared_task
def handleAppointmentCreateNotification(appointment_id):
	logger.debug("handleAppointmentCreateNotification")

	appointment = Appointment.objects.get(id=appointment_id)

	user = TelegramUser.objects.get(id=appointment.user)
	formated_date = format_date(appointment.date.date)

	user_response = \
	f"""
	*📝 Запис на консультацію*

	
	Ви створили запис на консультацію.

	📌 Назва: *{appointment.title}*
	📡 Формат: *{"Онлайн" if appointment.online else "Офлайн"}*
	📍 Місце проведення: *{appointment.address if appointment.address else "Міт у Zoom"}*
	🗓 Дата: *{formated_date}*

	*
	Очікуйте підтвердження психолога.
	*
	"""

	admin_response = \
	f"""
	*📝 Запис на консультацію*

	
	Створено новий запит на консультацію.

	📌 Назва: *{appointment.title}*
	📡 Формат: *{"Онлайн" if appointment.online else "Офлайн"}*
	📍 Місце проведення: *{appointment.address if appointment.address else "Міт у Zoom"}*
	🗓 Дата: *{formated_date}*
	👤 Користувач: *{user.first_name}*
	"""


	bot.send_message(user.id, user_response, parse_mode="Markdown")

	bot.send_message(settings.ADMIN_ID, admin_response, parse_mode="Markdown",
		reply_markup=InlineKeyboardMarkup([
        [InlineKeyboardButton(text='Написати користувачу', url=f'tg://user?id={user.id}')],
		[InlineKeyboardButton(text='Підтвердити/створити лінк у Zoom', callback_data=str(appointment_id))],
        [InlineKeyboardButton(text='Відкрити у панелі', url=f'https://psycholebedenko.online/admin/appointments/?state=0&status=pending&user={user.id}')],
    ]))


@bot.callback_query_handler(func=lambda call: True)
def handle_query(call):
	logger.debug("callback handle")

	appointment = Appointment.objects.get(id=call.data)

	link = create_appointment_zoom_link(appointment.id)

	_data = {"status": "appointed", "zoom_link": link}

	serializer = AppointmentCreateSerializer(instance=appointment, data=_data, partial=True)
	
	if serializer.is_valid():
		obj = serializer.save()

		handleAppointmentUpdateNotification.delay(obj.id)
		return

	bot.send_message(settings.ADMIN_ID, f"errors: {serializer.errors}", parse_mode="Markdown")


@shared_task
def handleAppointmentCreateByAdminNotification(appointment_id):
	logger.debug("handleAppointmentCreateByAdminNotification")

	appointment = Appointment.objects.get(id=appointment_id)

	user = TelegramUser.objects.get(id=appointment.user)
	formated_date = format_date(appointment.date.date)

	response_user = \
	f"""
	*📝 Запис на консультацію*

	
	Психолог записав вас на консультацію.

	📌 Назва: *{appointment.title}*
	📡 Формат: *{"Онлайн" if appointment.online else "Офлайн"}*
	📍 Місце проведення: {f"*{appointment.address}*" if appointment.address else f"[Міт у Zoom]({appointment.zoom_link})"}
	🗓 Дата: *{formated_date}*

	"""

	response_admin = \
	f"""
	*📝 Запис на консультацію*

	
	Ви записали користувача на консультацію.

	📌 Назва: *{appointment.title}*
	📡 Формат: *{"Онлайн" if appointment.online else "Офлайн"}*
	📍 Місце проведення: {f"*{appointment.address}*" if appointment.address else f"[Міт у Zoom]({appointment.zoom_link})"}
	🗓 Дата: *{formated_date}*
	👤 Користувач: *{user.first_name}*

	"""

	bot.send_message(user.id, response_user, parse_mode="Markdown")
	bot.send_message(settings.ADMIN_ID, response_admin, parse_mode="Markdown",
		reply_markup=InlineKeyboardMarkup([
        [InlineKeyboardButton(text='Написати користувачу', url=f'tg://user?id={user.id}')],
        [InlineKeyboardButton(text='Відкрити у панелі', url=f'https://psycholebedenko.online/admin/appointments/?state=0&user={user.id}')],
    ]))
	

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

	error_response = \
	f"""
	*❌ Виникла помилка*

	Час на верифікацію телефона вийшов, або
	були надані неправильні дані

	Спробуйте пізніше або зверніться до
	психолога за допомогою.
	"""

	server_error = lambda error: \
	f"""
	*❌ Сервера помилка*

	{error}

	Спробуйте пізніше або зверніться до
	психолога за допомогою.
	"""

	good_response = \
	f"""
	*✅ Успішно!*

	Тепер психолог зможе з вами зв'язати при
	необхідності обговорити питання щодо консультацій.

	*
	Ваше ім'я та номер телефона потрібні лише 
	для можливості зв'язку з психологом. 
	Конфіденційність ваших даних гарантована.
	*
	"""

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

	_response = \
	f"""
	*⚙️ Налаштування Особистого кабінета:*

	👤 Ім'я: *{user.first_name}*
	📞 Номер телефона: *{user.phone_number if user.phone_number else "Невідомий"}*
	🕒 Оповіщення: *{"🟢 Включені" if user.notifications_on else "🔴 Ввимкнені"}*

	*
	Ваше ім'я та номер телефона потрібні лише 
	для можливості зв'язку з психологом. 
	Конфіденційність ваших даних гарантована.
	*
	"""


	bot.send_message(message.from_user.id, _response, reply_markup=gen_settings_markup(message.from_user.id), parse_mode="Markdown")


@bot.message_handler(regexp="📇 Меню")
def menu(message):
	logger.debug("menu")
	
	response = \
	f"""
	📇 Головне меню
	"""

	bot.send_message(message.from_user.id, response, reply_markup=gen_menu_markup(message.chat.id))


@bot.message_handler(regexp="🔴 Вимкнути оповіщення")
def notifications_off(message):
	logger.debug("notification off")

	user = TelegramUser.objects.get(id=message.chat.id)
	serializer = TelegramUserSerializer(user, data={"notifications_on": False}, partial=True)

	if serializer.is_valid():
		serializer.save()

		response = \
		f"""
		*✅ Змінено!*

		Тепер бот *не буде* відправляти вам
		повідомлення про початок консультацій та
		групових зустрічей.
		"""
		
		bot.send_message(user.id, response, reply_markup=gen_settings_markup(user.id), parse_mode="Markdown")
		return

	response = \
	f"""
	*❌ Виникла помилка*

	Спробуйте пізніше або зверніться до
	психолога за допомогою.
	"""

	bot.send_message(user.id, response, reply_markup=gen_settings_markup(user.id), parse_mode="Markdown")

@bot.message_handler(regexp="🟢 Включити оповіщення")
def notifications_on(message):
	logger.debug("notifications on")

	user = TelegramUser.objects.get(id=message.chat.id)
	serializer = TelegramUserSerializer(user, data={"notifications_on": True}, partial=True)

	if serializer.is_valid():
		serializer.save()

		response = \
		f"""
		*✅ Змінено!*

		Тепер бот *буде* відправляти вам
		повідомлення про початок консультацій та
		групових зустрічей.
		"""
		
		bot.send_message(user.id, response, reply_markup=gen_settings_markup(user.id), parse_mode="Markdown")
		return

	response = \
	f"""
	*❌ Виникла помилка*

	Спробуйте пізніше або зверніться до
	психолога за допомогою.
	"""

	bot.send_message(user.id, response, reply_markup=gen_settings_markup(user.id), parse_mode="Markdown")

@bot.message_handler(regexp="📞 Оновити номер телефона")
def phone_update(message):
	logger.debug("phone update")
	user = TelegramUser.objects.get(id=message.chat.id)

	try:
		wsToken, confirmToken = generatePhoneVerificationTokens(user.id, user.auth_date)
		cache.set(wsToken, confirmToken, settings.PHONE_VERIFICATION_TIMEOUT_SECS)
	
		response = \
		f"""
		*📞 Оновлення номера телефона*

		Надайте номер телефона через меню. ⬇️⬇️⬇️

		*
		Через 5 хвилин, активація стане недоступною.
		При помилці/труднощах, зверніться до психолога.
		*
		"""

		bot.send_message(user.id, response, reply_markup=phone_verification_markup, parse_mode="Markdown")
		return
	except:
		response = \
		f"""
		*❌ Виникла помилка*

		Спробуйте пізніше або зверніться до
		психолога за допомогою.
		"""

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

@bot.message_handler(commands=["phone_test"])
def response(message):
	bot.send_message(message.from_user.id, "phone_markup", reply_markup=phone_verification_markup)

@bot.message_handler(commands=["menu_test"])
def response(message):
	bot.send_message(message.from_user.id, "menu_markup", reply_markup=gen_menu_markup(message.chat.id))


@bot.message_handler(commands=['test'])
def test(message):
	logger.debug("test")

	bot.send_message(message.from_user.id, "[test](https://psycholebedenko.online)", parse_mode="Markdown")