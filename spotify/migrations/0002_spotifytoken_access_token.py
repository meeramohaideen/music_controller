# Generated by Django 3.0.5 on 2021-01-10 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='spotifytoken',
            name='access_token',
            field=models.CharField(default='ZZZZZZZ', max_length=150),
        ),
    ]