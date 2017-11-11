from django.contrib.auth.models import User
from rest_framework import serializers
from apps.musical_group.models import MusicalStyle, Song, MusicalInstrument, \
    UserMusicalInstrumentStyle
from apps.user.serializers import UserInfoSerializer


# Serializers define the API representation.
class UserSerializer(serializers.ModelSerializer):

    name = serializers.SerializerMethodField()

    def get_name(self, obj):
        return '{}'.format(obj.username)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_staff', 'name')


class MusicalInstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MusicalInstrument
        fields = '__all__'


class MusicalStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MusicalStyle
        fields = ('id', 'name')


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = '__all__'


class UserMusicalInstrumentStyleSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    user_id = UserInfoSerializer(write_only=True)
    musical_instruments = MusicalInstrumentSerializer(read_only=True)
    musical_instruments_id = MusicalInstrumentSerializer(write_only=True)

    name_traduction = serializers.SerializerMethodField()

    # def get_name_traduction(self, obj):
    #     instruments = [x.name for x in obj.musical_instruments.all()]
    #     return '{} {}'.format(obj.user.username,instruments)

    class Meta:
        model = UserMusicalInstrumentStyle
        fields = '__all__'
