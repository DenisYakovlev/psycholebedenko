from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class TelegramUser(AbstractUser):
    id = models.CharField(max_length=128, blank=False, null=False, unique=True, primary_key=True)
    first_name = models.CharField(max_length=128, blank=True, null=True)
    last_name = models.CharField(max_length=128, blank=True, null=True)
    username = models.CharField(max_length=128, blank=True, null=True)
    photo_url = models.URLField(max_length=512, blank=True, null=True)
    auth_date = models.IntegerField(blank=True, null=True)
    
    password = models.CharField(max_length=32, blank=True, null=True)
    
    USERNAME_FIELD = 'id'
    REQUIRED_FIELDS = ['first_name']