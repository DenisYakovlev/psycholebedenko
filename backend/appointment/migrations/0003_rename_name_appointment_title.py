# Generated by Django 4.0 on 2023-06-22 19:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('appointment', '0002_appointment_name_appointment_zoom_link'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appointment',
            old_name='name',
            new_name='title',
        ),
    ]
