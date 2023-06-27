# Generated by Django 4.0 on 2023-06-27 21:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointment', '0003_rename_name_appointment_title'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='appointment',
            options={'ordering': ['date']},
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='appointed',
        ),
        migrations.AddField(
            model_name='appointment',
            name='date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='appointment',
            name='status',
            field=models.TextField(blank=True, choices=[('pending', 'Pending'), ('appointed', 'Appointed'), ('complete', 'Complete'), ('denied', 'Denied')], null=True),
        ),
    ]
