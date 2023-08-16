import random
from django.db import models
from user.models import TelegramUser

# Create your models here.

def set_default_random_img():
    img_id = random.randint(1, 4)
    s3bucket_url = f"https://psycholebedenko-backend.s3.amazonaws.com/event_img_{img_id}.jpeg" 

    return s3bucket_url

class Event(models.Model):
    title = models.CharField(max_length=512, blank=False, null=False, unique=True)
    thumbnail_text = models.CharField(max_length=512, blank=True)
    main_text = models.CharField(max_length=10000, blank=True)
    img_url = models.URLField(default=set_default_random_img(), blank=True, null=True)
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