from django.db import models
from user.models import TelegramUser

# Create your models here.


class Event(models.Model):
    title = models.CharField(max_length=512, blank=False, null=False, unique=True)
    thumbnail_text = models.CharField(max_length=512, blank=True)
    main_text = models.CharField(max_length=10000, blank=True)
    date = models.DateTimeField(blank=True, null=True)
    duration = models.IntegerField(blank=True, null=True)
    online = models.BooleanField(default=False)
    zoom_link = models.URLField(blank=True, null=True) 
    address = models.CharField(max_length=512, blank=True, null=True)
    participants = models.ManyToManyField(TelegramUser, through="Participation")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['date']
        

class Participation(models.Model):
    user = models.ForeignKey(TelegramUser, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)