from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _


# Create your models here.

class TelegramUserManager(BaseUserManager):
    def create_user(self, id, first_name, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not id:
            raise ValueError(_("Id is required"))
        if not first_name:
            raise ValueError(_("First name is required"))
        
        user = self.model(id=id, first_name=first_name, **extra_fields)
        user.save()
        return user

    def create_superuser(self, id, first_name, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        
        user = self.model(id=id, first_name=first_name, **extra_fields)
        user.set_password(password)
        user.save()
        return user


class TelegramUser(AbstractUser):
    id = models.CharField(max_length=128, blank=False, null=False, unique=True, primary_key=True)
    first_name = models.CharField(max_length=128, blank=True, null=True)
    last_name = models.CharField(max_length=128, blank=True, null=True)
    username = models.CharField(max_length=128, blank=True, null=True)
    photo_url = models.URLField(max_length=512, blank=True, null=True)
    auth_date = models.IntegerField(blank=True, null=True)
    
    password = models.CharField(max_length=32, blank=True, null=True)
    
    objects = TelegramUserManager()
    
    USERNAME_FIELD = 'id'
    REQUIRED_FIELDS = ['first_name']