from django.contrib.auth.models import User
from rest_framework import serializers
from apps.event.models import Event, EventStatus, Invitation
from apps.api.serializers import UserSerializer
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


class InvitationSerializer(serializers.ModelSerializer):

    owner = UserSerializer(read_only=True)
    user_invited = UserSerializer(read_only=True)

    class Meta:
        model = Invitation
        fields = '__all__'
