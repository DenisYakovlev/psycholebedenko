# Generated by Django 4.2.2 on 2023-08-04 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='duration',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
