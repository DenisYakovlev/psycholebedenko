from django.contrib import admin
from .models import PsycholyTest, TestResult, TestAnswer

# Register your models here.

admin.site.register(PsycholyTest)
admin.site.register(TestAnswer)
admin.site.register(TestResult)