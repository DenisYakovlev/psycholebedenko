from celery import shared_task
from bot.bot import test_rabbit, test_beat_

@shared_task
def test():
    test_rabbit()
    return 

@shared_task
def test_beat():
    test_beat_()
    return 