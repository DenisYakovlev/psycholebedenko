from django.db import models
from user.models import TelegramUser

# Create your models here.


class PsycholyTest(models.Model):
    name = models.CharField(max_length=512, blank=True, null=True)
    img_url = models.URLField(max_length=512, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    test = models.JSONField(blank=True, null=True)

class TestResult(models.Model):
    test = models.ForeignKey(PsycholyTest, on_delete=models.CASCADE)
    user = models.ForeignKey(TelegramUser, on_delete=models.CASCADE)
    score = models.IntegerField(blank=True, null=True)
    result_hash = models.CharField(max_length=10, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)