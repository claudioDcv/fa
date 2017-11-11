from django.db import models
from django.contrib.auth.models import User


class UserInfo(models.Model):
    age = models.DateField()
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )

    class Meta:
        verbose_name = 'Información de usuario'
        verbose_name_plural = 'Información de usuarios'

    def __str__(self):
        return '{} ({})'.format(self.user.first_name, self.user.username)
