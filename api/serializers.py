from django.contrib.auth.models import User, Group
from rest_framework import serializers

from api.models import OriginalMeterData


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class MeterDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = OriginalMeterData
        fields = ['geom']
