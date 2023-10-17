from django_filters import rest_framework as filters
import pytz
from datetime import datetime, timedelta
from django.conf import settings


class AppointmentFilters(filters.FilterSet):
    user = filters.CharFilter(method='filter_by_user', field_name='user')
    status = filters.CharFilter(method='filter_by_status', field_name='status')
    outdated = filters.BooleanFilter(method='filter_by_date', field_name='date__date')

    def filter_by_user(self, queryset, field, value):
        try:
            return queryset.filter(user=value)
        
        except queryset.DoesNotExist:
            return queryset
        

    def filter_by_status(self, queryset, field, value):
        try:
            _status = value.split(',')
            return queryset.filter(status__in=_status)
        
        except:
            return queryset
        
    def filter_by_date(self, queryset, field, value):
        tz = pytz.timezone(settings.TIME_ZONE)
        now = datetime.now(tz=tz)

        if value:
            return queryset
        else:
            return queryset.filter(date__date__gt=now - timedelta(hours=1))