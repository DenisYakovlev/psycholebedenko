import datetime
from django.db import models
from user.models import TelegramUser
from schedule.models import Schedule

# Create your models here.

def set_default_title():
    try:
        return f"Appointment #{Appointment.objects.latest('id').id}"
    except Appointment.DoesNotExist:
        return f"Appointment #0"

def set_default_address():
    return "Ще не визначено"

class Appointment(models.Model):
    # change created_at to timezone with hour min sec format
    
    class Status(models.TextChoices):
        PENDING = 'pending'
        APPOINTED = 'appointed'
        COMPLETE = 'complete'
        DENIED = 'denied'
        
    title = models.TextField(blank=False, null=False, default=set_default_title)
    notes = models.CharField(max_length=2048, blank=True, null=True)
    user = models.ForeignKey(TelegramUser, on_delete=models.CASCADE)
    date = models.OneToOneField(Schedule, on_delete=models.SET_NULL, null=True, blank=False)
    online = models.BooleanField(default=True)
    zoom_link = models.URLField(blank=True, null=True)
    address = models.CharField(max_length=512, blank=True, null=True)
    status = models.TextField(choices=Status.choices, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['date']