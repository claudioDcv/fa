# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-12 16:50
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('musical_group', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('start', models.DateTimeField()),
                ('end', models.DateTimeField()),
                ('color', models.CharField(max_length=10)),
                ('description', models.TextField(blank=True, null=True)),
                ('accepted_users', models.ManyToManyField(blank=True, related_name='accepted_users', to=settings.AUTH_USER_MODEL)),
                ('musical_group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='musical_group.MusicalGroup')),
                ('notified_users', models.ManyToManyField(blank=True, related_name='notified_users', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='EventStatus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('color', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Invitation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('date', models.DateField()),
                ('collaborate_in', models.CharField(choices=[('SONG', 'Tema'), ('MUSICAL_GROUP', 'Grupo Musical'), ('PLAYLIST', 'Playlist')], default=None, max_length=2)),
                ('status', models.CharField(choices=[('SENT', 'Enviado'), ('PENDING', 'Pendiente'), ('ACEPTED', 'Aceptado'), ('REJECTED', 'Rechazado')], default=('SENT', 'Enviado'), max_length=2)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('user_invited', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_invited', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='event',
            name='status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='event.EventStatus'),
        ),
    ]
