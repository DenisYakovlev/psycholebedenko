import os
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')

app = Celery('app')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.beat_schedule = {
    'appointment_notifications': {
        'task': 'appointment.tasks.appoinment_notifications',
        'schedule': crontab(hour="*", minute="5"),
        'args': ()
    },
    'event_notifications': {
        'task': 'event.tasks.event_notifications',
        'schedule': crontab(hour="*", minute="5"),
        'args': ()
    }
}

app.autodiscover_tasks()