from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes

from .tasks import test
from appointment.tasks import appoinment_notifications

import pytz
from datetime import datetime, timedelta

from django.conf import settings
from appointment.models import Appointment


@api_view(["GET"])
@permission_classes([])
def healthcheck(request):
    # healthcheck for app

    return Response({"msg": "working"}, status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([])
def rabbit_test(request):
    # testing rabbit with telegram
    tz = pytz.timezone(settings.TIME_ZONE)
    start = datetime.now(tz=tz)
    end = start + timedelta(hours=1)

    appointment = Appointment.objects. \
        filter(date__date__gt=start, date__date__lt=end).first()

    print(appointment.date.date)
    
    return Response({"msg": "working"}, status.HTTP_200_OK)
