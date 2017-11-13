from django.db import models
from django.contrib.auth.models import User
from apps.musical_group.models import MusicalGroup
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from .model_utils import Choices


class EventStatus(models.Model):
    name = models.CharField(max_length=255)
    color = models.CharField(max_length=255)

    def __str__(self):
        return '{} {}'.format(self.name, self.color)

class Event(models.Model):
    title = models.CharField(max_length=255)
    status = models.ForeignKey(EventStatus)
    musical_group = models.ForeignKey(MusicalGroup)
    start = models.DateTimeField()
    end = models.DateTimeField()
    color = models.CharField(max_length=10)
    owner = models.ForeignKey(User)
    notified_users = models.ManyToManyField(User, related_name='notified_users', blank=True)
    accepted_users = models.ManyToManyField(User, related_name='accepted_users', blank=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title



class Invitation(models.Model):
    name = models.CharField(max_length=255)

    owner = models.ForeignKey(User)
    user_invited = models.ForeignKey(User, related_name='user_invited')

    date = models.DateField()


    OBJ_COLL = (
        ('SONG', 'Tema'),
        ('MUSICAL_GROUP', 'Grupo Musical'),
        ('PLAYLIST', 'Playlist'),
    )

    collaborate_in = models.CharField(
        max_length=13,
        choices=OBJ_COLL,
        default=None,
    )

    STATUS = (
        ('SENT', 'Enviado'),
        ('PENDING', 'Pendiente'),
        ('ACEPTED', 'Aceptado'),
        ('REJECTED', 'Rechazado'),
    )

    status = models.CharField(
        max_length=8,
        choices=STATUS,
        default=STATUS[0],
    )
