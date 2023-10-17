from datetime import datetime, timedelta
import pytz
from django.conf import settings
from django_filters import rest_framework as filters


class EventFilter(filters.FilterSet):
    status = filters.CharFilter(method='filter_status', field_name='date')

    def filter_status(self, queryset, name, value):
        timezone = pytz.timezone(settings.TIME_ZONE)
        now = datetime.now(tz=timezone)

        if value == "active":
            return queryset.filter(date__gt=now - timedelta(hours=1))
        elif value == "outdated": 
            return queryset.filter(date__lt=now)
        else:
            return queryset
        
