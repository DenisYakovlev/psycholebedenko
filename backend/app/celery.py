import os
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')

app = Celery('app')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.beat_schedule = {
    # 'test': {
    #     'task': 'server.tasks.test_beat',
    #     'schedule': crontab(minute='55', hour='*'),
    #     'args': ()
    # },
    # 'appointment_notifications': {
    #     'task': 'appointment.tasks.appoinment_notifications',
    #     'schedule': crontab(minute="*"),
    #     'args': ()
    # }
}

app.autodiscover_tasks()