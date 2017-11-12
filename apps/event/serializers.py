from django.contrib.auth.models import User
from rest_framework import serializers
from apps.event.models import Event, EventStatus
import datetime


class EventStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventStatus
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    '''
    @ 2017-11-10T03:04:32.985Z
    '''
    status = EventStatusSerializer(read_only=True)

    class Meta:
        model = Event
        fields = '__all__'
