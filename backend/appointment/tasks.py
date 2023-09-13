import pytz
from datetime import datetime, timedelta
from celery import shared_task

from django.conf import settings
from .models import Appointment
from bot.bot import appointment_notification, appointment_notification_fail


@shared_task
def appoinment_notifications():
    try:
        tz = pytz.timezone(settings.TIME_ZONE)
        start = datetime.now(tz=tz)
        end = start + timedelta(hours=1)


        appointment = Appointment.objects. \
            filter(date__date__gt=start, date__date__lt=end).first()

        if not appointment:
            appointment_notification_fail(settings.ADMIN_ID)
            return 
        
        appointment_notification(appointment, settings.ADMIN_ID)
    except Appointment.DoesNotExist:
        appointment_notification_fail(settings.ADMIN_ID)