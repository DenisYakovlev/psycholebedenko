from django_filters import rest_framework as filters
from datetime import datetime
import pytz
from django.conf import settings


class UserAppointmentsFilters(filters.FilterSet):
    status = filters.CharFilter(method='filter_status', field_name='status')
    state = filters.CharFilter(method='filter_state', field_name='date')

    def filter_status(self, queryset, name, value):
        # look for status values in appointment model.
        # format: pending,appointed, ...
        try:
            status_list = value.split(',')
            return queryset.filter(status__in=status_list)
        except:
            return queryset
    
    def filter_state(self, queryset, name, value):
        timezone = pytz.timezone(settings.TIME_ZONE)
        now = datetime.now(tz=timezone)

        if value == "active":
            return queryset.filter(date__date__gt=now)
        elif value == "outdated": 
            return queryset.filter(date__date__lt=now)
        else:
            return queryset