from django.contrib import admin
from .models import TelegramUser

# Register your models here.

# admin.site.register(TelegramUser)

@admin.register(TelegramUser)
class TelegramUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'phone_number')