# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-13 13:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0002_auto_20171112_1352'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invitation',
            name='collaborate_in',
            field=models.CharField(choices=[('SONG', 'Tema'), ('MUSICAL_GROUP', 'Grupo Musical'), ('PLAYLIST', 'Playlist')], default=None, max_length=13),
        ),
    ]
