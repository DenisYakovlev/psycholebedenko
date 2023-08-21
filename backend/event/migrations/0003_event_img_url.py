# Generated by Django 4.2.2 on 2023-08-16 12:58

from django.db import migrations, models
import event.models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0002_event_duration'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='img_url',
            field=models.URLField(blank=True, default=event.models.set_default_random_img, null=True),
        ),
    ]