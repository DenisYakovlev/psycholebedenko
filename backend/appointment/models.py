from django.db import models
from user.models import TelegramUser

# Create your models here.


class Appointment(models.Model):
    name = models.TextField(blank=False, null=False)
    notes = models.TextField(blank=True, null=True)
    user = models.ForeignKey(TelegramUser, on_delete=models.CASCADE)
    appointed = models.DateTimeField(blank=False, null=False)
    zoom_link = models.URLField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    
    class Meta:
        ordering = ['appointed']
        
{
    "name": "test",
    "note": "test",
    "appointed": "2023-10-10",
    "user": "820543856"
}