import pytz
from django.conf import settings
from . import day_names, month_names


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