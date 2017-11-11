from django.db import models
from apps.user.models import UserInfo


class Event(models.Model):
    title = models.CharField(max_length=255)
    start = models.DateTimeField()
    end = models.DateTimeField()
    color = models.CharField(max_length=10)
    users = models.ManyToManyField(UserInfo)
    description = models.TextField()

    def __str__(self):
        return self.title
