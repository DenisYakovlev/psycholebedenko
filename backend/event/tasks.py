import pytz
import requests
from datetime import datetime, timedelta
from celery import shared_task

from django.conf import settings
from celery import group
from .models import Event, Participation
from app.utils import generate_zoom_access_key, aware_now


@shared_task
def event_notifications():
    check_start_time = aware_now()
    check_end_time = check_start_time + timedelta(hours=1)

    event = Event.objects.\
            filter(date__gt=check_start_time, date__lt=check_end_time).first()
    
    participations = Participation.objects.filter(event=event.id)
    
    from bot.bot import handleEventNotification

    users_to_notify = group(handleEventNotification.si(event.id, participation.user.id) for participation in participations)
    users_to_notify.apply_async()
    
    
@shared_task
def create_event_zoom_link(event_id):
    # more info: https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/meetingCreate

    # access token is valid for 60 minutes. Generate it every time for new request 
    access_token = generate_zoom_access_key()

    event = Event.objects.get(id=event_id)

    url = "https://api.zoom.us/v2/users/me/meetings"

    body = {
        "topic": f"{event.title}",
        # type 2 stands for scheduled meeting
        "type": 2,

        # adjusting start time and timezone
        "start_time": event.date.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "timezone": settings.TIME_ZONE,

        "duration": event.duration,
        # replace dummy password in case it's actually needed.
        # There is no need to make it secure for now.
        "password": "12345",

        "agenda": f"{event.thumbnail_text}",
        "settings": {
            "allow_multiple_devices": True,
            "host_video": False,
            "participant_video": False,
            "join_before_host": False,
            "mute_upon_entry": True
        }
    }

    req = requests.post(url, json=body, headers={
        "Authorization": f"Bearer {access_token}"
    })

    req.raise_for_status()
    response = req.json()

    from .serializers import EventSerializer

    # save new zoom_link
    serializer = EventSerializer(instance=event, 
                        data={"zoom_link": response["join_url"]}, partial=True)
    
    serializer.is_valid(raise_exception=True)
    serializer.save()