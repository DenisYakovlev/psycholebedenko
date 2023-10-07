# Generated by Django 4.2.2 on 2023-10-07 13:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('psy_tests', '0004_psycholytest_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='testresult',
            name='test',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='psy_tests.psycholytest'),
        ),
        migrations.AlterField(
            model_name='testresult',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='TestAnswer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('min_score', models.IntegerField(blank=True, null=True)),
                ('max_score', models.IntegerField(blank=True, null=True)),
                ('answer', models.TextField(blank=True, null=True)),
                ('test', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='psy_tests.psycholytest')),
            ],
        ),
        migrations.AddField(
            model_name='testresult',
            name='answer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='psy_tests.testanswer'),
        ),
    ]
