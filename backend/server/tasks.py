from celery import shared_task

@shared_task
def test():
    return 

@shared_task
def test_beat():
    return 