from django.db import models
# Create your models here.


class Schedule(models.Model):
    date = models.DateTimeField(blank=True, null=True, unique=True)