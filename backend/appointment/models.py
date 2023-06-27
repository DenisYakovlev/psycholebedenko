import datetime
from django.db import models
from user.models import TelegramUser

# Create your models here.

def set_default_title():
    return f"Appointment #{Appointment.objects.count() + 1}"

class Appointment(models.Model):
    # change created_at to timezone with hour min sec format
    
    class Status(models.TextChoices):
        PENDING = 'pending'
        APPOINTED = 'appointed'
        COMPLETE = 'complete'
        DENIED = 'denied'
        
    title = models.TextField(blank=False, null=False, default=set_default_title)
    notes = models.TextField(blank=True, null=True)
    user = models.ForeignKey(TelegramUser, on_delete=models.CASCADE)
    date = models.DateTimeField(blank=True, null=True)
    zoom_link = models.URLField(blank=True, null=True)
    status = models.TextField(choices=Status.choices, blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    
    class Meta:
        ordering = ['date']