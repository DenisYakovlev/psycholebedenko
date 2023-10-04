from django.contrib import admin
from .models import PsycholyTest, TestResult

# Register your models here.

admin.site.register(PsycholyTest)
admin.site.register(TestResult)