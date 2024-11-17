from .models import Provider, Patient, MedicationHistory, VaccinationHistory, FamilyHistory, SocialHistory, SurgicalHistory, VitalHistory, AllergyHistory

from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ["id", "username", "email", "password"]

class ProviderSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Provider
        fields = ["account", "name", "provider_type", "provider_location"]  

class PatientSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Patient
        fields = '__all__'

class MedicationHistorySerializer(serializers.ModelSerializer):
    class Meta(object):
        model = MedicationHistory
        fields = '__all__'

class VaccinationHistorySerializer(serializers.ModelSerializer):
    class Meta(object):
        model = VaccinationHistory
        fields = '__all__'

class FamilyHistorySerializer(serializers.ModelSerializer):
    class Meta(object):
        model = FamilyHistory
        fields = '__all__'

class SocialHistorySerializer(serializers.ModelSerializer):
    class Meta(object):
        model = SocialHistory
        fields = '__all__'

class SurgicalHistorySerializer(serializers.ModelSerializer):
    class Meta(object):
        model = SurgicalHistory
        fields = '__all__'

class VitalHistorySerializer(serializers.ModelSerializer):
    class Meta(object):
        model = VitalHistory
        fields = '__all__'

class AllergyHistorySerializer(serializers.ModelSerializer):
    class Meta(object):
        model = AllergyHistory
        fields = '__all__'