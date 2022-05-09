from rest_framework import serializers

from apps.users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'author_img')


class UserAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'author_img', "hobby", "signature")
