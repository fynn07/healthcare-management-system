from .models import Provider, Patient

from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ["id", "username", "email", "password"]

class ProviderSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Provider
        fields = ['id','account', 'name']  

class PatientSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Patient
        fields = '__all__'


