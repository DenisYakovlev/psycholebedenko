# Generated by Django 4.2.2 on 2023-10-05 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('psy_tests', '0002_testresult_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='psycholytest',
            name='img_url',
            field=models.URLField(blank=True, max_length=512, null=True),
        ),
    ]
