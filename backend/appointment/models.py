from django.db import models
from user.models import TelegramUser

# Create your models here.


class Appointment(models.Model):
    notes = models.TextField(blank=True, null=True)
    user = models.ForeignKey(TelegramUser, on_delete=models.CASCADE)
    appointed = models.DateTimeField(blank=False, null=False)
    created_at = models.DateField(auto_now_add=True)
    
    class Meta:
        ordering = ['appointed']