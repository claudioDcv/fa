from django.contrib.auth.models import User
from rest_framework import serializers
from apps.event.models import Event
import datetime


class EventSerializer(serializers.ModelSerializer):
    '''
    @ 2017-11-10T03:04:32.985Z
    '''
    class Meta:
        model = Event
        fields = '__all__'
