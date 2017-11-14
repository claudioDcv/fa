from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from apps.users.models import UserInfo, AvailableSpace

from django.dispatch import receiver


# method for updating
@receiver(post_save, sender=User)
def update_stock(sender, instance, **kwargs):
    available_space = AvailableSpace(user=instance, current_size_bite=0)
    available_space.save()
