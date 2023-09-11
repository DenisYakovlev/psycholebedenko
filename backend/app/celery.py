import os
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')

app = Celery('app')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.beat_schedule = {
    'test': {
        'task': 'server.tasks.test_beat',
        'schedule': crontab(),
        'args': ()
    },
}

app.autodiscover_tasks()