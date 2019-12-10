from django.contrib.auth.models import User, Group
from api.models import OriginalMeterData
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from api.serializers import UserSerializer, GroupSerializer, MeterDataSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    permission_classes = (IsAuthenticated, IsAdminUser)
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    permission_classes = (IsAuthenticated, IsAdminUser)
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class MeterDataViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    permission_classes = ()
    queryset = OriginalMeterData.objects.all()
    serializer_class = MeterDataSerializer
