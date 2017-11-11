from rest_framework import serializers
from apps.user.models import UserInfo
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


class UserInfoSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)
    user_id = UserSerializer(write_only=True)

    class Meta:
        model = UserInfo
        fields = '__all__'
