import pytz
import requests
from datetime import datetime, timedelta
from celery import shared_task

from django.conf import settings
from .models import Appointment
from app.utils import generate_zoom_access_key


@shared_task
def appoinment_notifications():
    try:
        tz = pytz.timezone(settings.TIME_ZONE)
        start = datetime.now(tz=tz)
        end = start + timedelta(hours=1)

        appointment = Appointment.objects. \
            filter(date__date__gt=start, date__date__lt=end).first()

        if not appointment:
            return 
        
        return
    except Appointment.DoesNotExist:
        return
    

@shared_task
def create_appointment_zoom_link(appointment_id):
    # more info: https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/meetingCreate

    # access token is valid for 60 minutes. Generate it every time for new request 
    access_token = generate_zoom_access_key()

    appointment = Appointment.objects.get(id=appointment_id)

    url = "https://api.zoom.us/v2/users/me/meetings"

    body = {
        "topic": f"{appointment.title}",
        # type 2 stands for scheduled meeting
        "type": 2,

        # adjusting start time and timezone
        "start_time": appointment.date.date.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "timezone": settings.TIME_ZONE,

        # base duration is 60 minutes
        "duration": "60",
        # replace dummy password in case it's actually needed.
        # There is no need to make it secure for now.
        "password": "12345",

        "agenda": f"{appointment.title}",
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

    from .serializers import AppointmentCreateSerializer

    # save new zoom_link
    serializer = AppointmentCreateSerializer(instance=appointment, 
                                             data={"zoom_link": response["join_url"]}, partial=True)
    
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return response["join_url"]