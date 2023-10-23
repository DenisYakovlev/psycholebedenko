from django.contrib import admin
from .models import PsycholyTest, TestResult, TestAnswer

# Register your models here.


@admin.register(PsycholyTest)
class TelegramUserAdmin(admin.ModelAdmin):
    list_display = ('name')
    

admin.site.register(TestAnswer)
admin.site.register(TestResult)
