from django.db import models
from user.models import TelegramUser

# Create your models here.


class Event(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=False, null=False, unique=True)
    thumbnail_text = models.CharField(max_length=200, blank=True)
    main_text = models.CharField(max_length=1200, blank=True)
    appointed = models.DateField(blank=False, null=False)
    participants = models.ManyToManyField(TelegramUser, through="Participation")

    class Meta:
        ordering = ['created']
        

class Participation(models.Model):
    user = models.ForeignKey(TelegramUser, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)