# Generated by Django 4.2.2 on 2023-10-04 20:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointment', '0006_alter_appointment_notes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='address',
            field=models.CharField(blank=True, max_length=512, null=True),
        ),
    ]
