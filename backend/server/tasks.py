from celery import shared_task
from bot.bot import test_rabbit


@shared_task
def test():
    test_rabbit()
    return 

@shared_task
def test_beat():
    print("Running")
    return 