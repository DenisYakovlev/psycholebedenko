# Generated by Django 4.2.2 on 2024-07-09 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0017_alter_event_img_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='img_url',
            field=models.URLField(blank=True, default='https://psycholebedenko-bucket.s3.eu-central-1.amazonaws.com/event_img_2.jpeg', null=True),
        ),
    ]