# Generated by Django 4.2.2 on 2023-10-05 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('psy_tests', '0003_psycholytest_img_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='psycholytest',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
