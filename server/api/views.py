from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from .serializers import UserSerializer, ProviderSerializer, PatientSerializer, MedicationHistorySerializer, VaccinationHistorySerializer, FamilyHistorySerializer, SocialHistorySerializer, SurgicalHistorySerializer
from .models import Provider, Patient, MedicationHistory, VaccinationHistory, FamilyHistory, SocialHistory, SurgicalHistory
from .pagination import initialize_pagination
from datetime import date

from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_token_auth(request):
    return Response(request.user.id)

@api_view(['POST'])
def user_signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"detail": "Not Found"}, status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def setup_provider(request):
    user = request.user

    if Provider.objects.filter(account=user.id).exists():
        return Response({"error": "This account already has a provider."}, status=status.HTTP_400_BAD_REQUEST)
    
    data = request.data.copy()  
    data['account'] = user.id 
    
    serializer = ProviderSerializer(data=data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_provider(request):
    user = request.user

    try:
        provider = Provider.objects.get(account=user)
    except:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    provider = Provider.objects.get(account=user)
    serializer = ProviderSerializer(provider)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_patient(request):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    data = request.data.copy()
    data['provider'] = provider.id

    serializer = PatientSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_single_patient(request, id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = PatientSerializer(patient)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_patients(request):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)
    
    patients = Patient.objects.filter(provider=provider)
    serializer = PatientSerializer(patients, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


#RECORDS

#MEDICATION HISTORY
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_medication_history_record(request, id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExists:
        return Response({"error" : "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    data = request.data.copy()
    data['patient'] = patient.id
    data['date_added'] = date.today()

    serializer = MedicationHistorySerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_medication_history_records(request, id):   
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    medication_history = MedicationHistory.objects.filter(patient=patient.id)

    paginator, paginated_medication_history = initialize_pagination(medication_history, request)

    serializer = MedicationHistorySerializer(paginated_medication_history, many=True)
    return paginator.get_paginated_response(serializer.data)

#VACCINATION HISTORY

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_vaccination_history_record(request, id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExists:
        return Response({"error" : "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    data = request.data.copy()
    data['patient'] = patient.id
    data['date_added'] = date.today()

    serializer = VaccinationHistorySerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_vaccination_history_records(request, id):   
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    vaccination_history = VaccinationHistory.objects.filter(patient=patient.id)

    paginator, paginated_vaccination_history = initialize_pagination(vaccination_history, request)

    serializer = VaccinationHistorySerializer(paginated_vaccination_history, many=True)
    return paginator.get_paginated_response(serializer.data)

#FAMILY HISTORY

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_family_history_record(request, id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExists:
        return Response({"error" : "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    data = request.data.copy()
    data['patient'] = patient.id
    data['date_added'] = date.today()

    serializer = FamilyHistorySerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_family_history_records(request, id):   
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    family_history = FamilyHistory.objects.filter(patient=patient.id)

    paginator, paginated_family_history = initialize_pagination(family_history, request)

    serializer = FamilyHistorySerializer(paginated_family_history, many=True)
    return paginator.get_paginated_response(serializer.data)

#SOCIAL HISTORY

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_social_history_record(request, id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExists:
        return Response({"error" : "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    data = request.data.copy()
    data['patient'] = patient.id
    data['date_added'] = date.today()

    serializer = SocialHistorySerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_social_history_records(request, id):   
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    social_history = SocialHistory.objects.filter(patient=patient.id)

    paginator, paginated_social_history = initialize_pagination(social_history, request)

    serializer = SocialHistorySerializer(paginated_social_history, many=True)
    return paginator.get_paginated_response(serializer.data)

#SURGICAL HISTORY

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_surgical_history_record(request, id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExists:
        return Response({"error" : "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    data = request.data.copy()
    data['patient'] = patient.id
    data['date_added'] = date.today()

    serializer = SurgicalHistorySerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_surgical_history_records(request, id):   
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    surgical_history = SurgicalHistory.objects.filter(patient=patient.id)

    paginator, paginated_surgical_history = initialize_pagination(surgical_history, request)

    serializer = SurgicalHistorySerializer(paginated_surgical_history, many=True)
    return paginator.get_paginated_response(serializer.data)


