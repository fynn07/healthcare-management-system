from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from .serializers import UserSerializer, ProviderSerializer, PatientSerializer, MedicationHistorySerializer, VaccinationHistorySerializer, FamilyHistorySerializer, SocialHistorySerializer, SurgicalHistorySerializer, VitalHistorySerializer, AllergyHistorySerializer
from .models import Provider, Patient, MedicationHistory, VaccinationHistory, FamilyHistory, SocialHistory, SurgicalHistory, VitalHistory, AllergyHistory
from .pagination import initialize_pagination
from datetime import date

from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
import uuid


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

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def change_user_password(request):
    user = request.user
    
    data = request.data.copy()  

    if not user.check_password(data['password']):
        return Response({"detail": "Not Found"}, status=status.HTTP_404_NOT_FOUND)

    user.set_password(data['new_password'])
    user.save() 

    return Response({"detail": "Success"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_user(request):
    serializer = UserSerializer(instance=request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def setup_provider(request):
    user = request.user

    if Provider.objects.filter(account=user.id).exists():
        return Response({"error": "This account already has a provider."}, status=status.HTTP_400_BAD_REQUEST)
    
    data = request.data.copy()  
    data['account'] = user.id 

    user.set_password(data['password'])
    user.save() 

    del data['password']
    
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
def upload(request):
    image = request.FILES['profile_picture']
        
    extension = image.name.split('.')[-1]  # Get the file extension
    unique_filename = f"{uuid.uuid4()}.{extension}"  # Create a random filename with extension
    
    file_path = default_storage.save(f"profile_pictures/{unique_filename}", ContentFile(image.read()))
    
    file_url = os.path.join(settings.MEDIA_URL, file_path)
    
    return JsonResponse({'profile_picture_url': file_url})


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

    if 'profile_image' in request.FILES:
        data['profile_image'] = request.FILES['profile_image']

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
    
    patients = Patient.objects.filter(provider=provider, is_deleted=False)
    serializer = PatientSerializer(patients, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_patient(request, id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    data = request.data.copy()
    data['provider'] = provider.id
    data['is_deleted'] = False  

    serializer = PatientSerializer(patient, data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_patient(request, id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)

    # Set is_deleted to True
    patient.is_deleted = True
    patient.save()

    return Response({"message": "Patient record successfully deleted."}, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def generate_patient_json(request, id, provider_account):
    try:
        provider = Provider.objects.get(account=provider_account)
    except:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    patient_serializer = PatientSerializer(patient)
    medication_serializer = MedicationHistorySerializer(MedicationHistory.objects.filter(patient=patient.id, is_deleted=False), many=True)
    vaccination_serializer = VaccinationHistorySerializer(VaccinationHistory.objects.filter(patient=patient.id, is_deleted=False), many=True)
    family_serializer = FamilyHistorySerializer(FamilyHistory.objects.filter(patient=patient.id, is_deleted=False), many=True)
    social_serializer = SocialHistorySerializer(SocialHistory.objects.filter(patient=patient.id, is_deleted=False), many=True)
    surgical_serializer = SurgicalHistorySerializer(SurgicalHistory.objects.filter(patient=patient.id, is_deleted=False), many=True)
    vital_serializer = VitalHistorySerializer(VitalHistory.objects.filter(patient=patient.id, is_deleted=False), many=True)
    allergy_serializer = AllergyHistorySerializer(AllergyHistory.objects.filter(patient=patient.id, is_deleted=False), many=True)

    context = {
        "patient": patient_serializer.data,
        "medication_history": medication_serializer.data,
        "vaccination_history": vaccination_serializer.data,
        "family_history": family_serializer.data,
        "social_history": social_serializer.data,
        "surgical_history": surgical_serializer.data,
        "vital_history": vital_serializer.data,
        "allergy_history": allergy_serializer.data,
    }

    return Response(context, status=status.HTTP_200_OK)


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
def download_medical_records_pdf(request, id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    # Fetch medication history
    medication_history = MedicationHistory.objects.filter(patient=patient.id)

    # Render the template with context
    context = {
        "patient": patient,
        "provider": provider,
        "medication_history": medication_history
    }
    html = render_to_string("medical_records_template.html", context)

    # Generate the PDF
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="medical_records_{patient.id}.pdf"'
    pisa_status = pisa.CreatePDF(html, dest=response)

    if pisa_status.err:
        return Response({"error": "Error generating PDF"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return response


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
    
    medication_history = MedicationHistory.objects.filter(patient=patient.id, is_deleted=False)

    paginator, paginated_medication_history = initialize_pagination(medication_history, request)

    serializer = MedicationHistorySerializer(paginated_medication_history, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_single_medication_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        medication_history = MedicationHistory.objects.get(id=record_id, patient=patient)
    except MedicationHistory.DoesNotExist:
        return Response({"error": "Medication history record not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = MedicationHistorySerializer(medication_history)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_medication_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        medication_history = MedicationHistory.objects.get(id=record_id, patient=patient)
    except MedicationHistory.DoesNotExist:
        return Response({"error": "Medication history record not found."}, status=status.HTTP_404_NOT_FOUND)
    
    # Update the allergy history record with the new data
    data = request.data.copy()
    data['patient'] = patient.id  # Ensure the patient ID stays the same
    data['date_added'] = medication_history.date_added  # Keep the original date_added

    serializer = MedicationHistorySerializer(medication_history, data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_medication_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        medication_history = MedicationHistory.objects.get(id=record_id, patient=patient)
    except MedicationHistory.DoesNotExist:
        return Response({"error": "Medication history record not found."}, status=status.HTTP_404_NOT_FOUND)

    # Set is_deleted to True
    medication_history.is_deleted = True
    medication_history.save()

    return Response({"message": "Medication history record successfully deleted."}, status=status.HTTP_200_OK)


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
    
    vaccination_history = VaccinationHistory.objects.filter(patient=patient.id, is_deleted=False)

    paginator, paginated_vaccination_history = initialize_pagination(vaccination_history, request)

    serializer = VaccinationHistorySerializer(paginated_vaccination_history, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_single_vaccination_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        vaccination_history = VaccinationHistory.objects.get(id=record_id, patient=patient)
    except VaccinationHistory.DoesNotExist:
        return Response({"error": "Vaccination history record not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = VaccinationHistorySerializer(vaccination_history)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_vaccination_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        vaccination_history = VaccinationHistory.objects.get(id=record_id, patient=patient)
    except VaccinationHistory.DoesNotExist:
        return Response({"error": "Vaccination history record not found."}, status=status.HTTP_404_NOT_FOUND)
    
    # Update the allergy history record with the new data
    data = request.data.copy()
    data['patient'] = patient.id  # Ensure the patient ID stays the same
    data['date_added'] = vaccination_history.date_added  # Keep the original date_added

    serializer = VaccinationHistorySerializer(vaccination_history, data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_vaccination_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        vaccination_history = VaccinationHistory.objects.get(id=record_id, patient=patient)
    except VaccinationHistory.DoesNotExist:
        return Response({"error": "Vaccination history record not found."}, status=status.HTTP_404_NOT_FOUND)

    # Set is_deleted to True
    vaccination_history.is_deleted = True
    vaccination_history.save()

    return Response({"message": "Vaccination history record successfully deleted."}, status=status.HTTP_200_OK)

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
    
    family_history = FamilyHistory.objects.filter(patient=patient.id, is_deleted=False)

    paginator, paginated_family_history = initialize_pagination(family_history, request)

    serializer = FamilyHistorySerializer(paginated_family_history, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_single_family_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        family_history = FamilyHistory.objects.get(id=record_id, patient=patient)
    except FamilyHistory.DoesNotExist:
        return Response({"error": "Family history record not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = FamilyHistorySerializer(family_history)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_family_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        family_history = FamilyHistory.objects.get(id=record_id, patient=patient)
    except FamilyHistory.DoesNotExist:
        return Response({"error": "Family history record not found."}, status=status.HTTP_404_NOT_FOUND)
    
    # Update the allergy history record with the new data
    data = request.data.copy()
    data['patient'] = patient.id  # Ensure the patient ID stays the same
    data['date_added'] = family_history.date_added  # Keep the original date_added

    serializer = FamilyHistorySerializer(family_history, data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_family_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        family_history = FamilyHistory.objects.get(id=record_id, patient=patient)
    except FamilyHistory.DoesNotExist:
        return Response({"error": "Family history record not found."}, status=status.HTTP_404_NOT_FOUND)

    # Set is_deleted to True
    family_history.is_deleted = True
    family_history.save()

    return Response({"message": "Family history record successfully deleted."}, status=status.HTTP_200_OK)

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
    
    social_history = SocialHistory.objects.filter(patient=patient.id, is_deleted=False)

    paginator, paginated_social_history = initialize_pagination(social_history, request)

    serializer = SocialHistorySerializer(paginated_social_history, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_single_social_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        social_history = SocialHistory.objects.get(id=record_id, patient=patient)
    except SocialHistory.DoesNotExist:
        return Response({"error": "Social history record not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = SocialHistorySerializer(social_history)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_social_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        social_history = SocialHistory.objects.get(id=record_id, patient=patient)
    except SocialHistory.DoesNotExist:
        return Response({"error": "Social history record not found."}, status=status.HTTP_404_NOT_FOUND)
    
    # Update the allergy history record with the new data
    data = request.data.copy()
    data['patient'] = patient.id  # Ensure the patient ID stays the same
    data['date_added'] = social_history.date_added  # Keep the original date_added

    serializer = SocialHistorySerializer(social_history, data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_social_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        social_history = SocialHistory.objects.get(id=record_id, patient=patient)
    except SocialHistory.DoesNotExist:
        return Response({"error": "Social history record not found."}, status=status.HTTP_404_NOT_FOUND)

    # Set is_deleted to True
    social_history.is_deleted = True
    social_history.save()

    return Response({"message": "Social history record successfully deleted."}, status=status.HTTP_200_OK)

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
    
    surgical_history = SurgicalHistory.objects.filter(patient=patient.id, is_deleted=False)

    paginator, paginated_surgical_history = initialize_pagination(surgical_history, request)

    serializer = SurgicalHistorySerializer(paginated_surgical_history, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_single_surgical_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        surgical_history = SurgicalHistory.objects.get(id=record_id, patient=patient)
    except SurgicalHistory.DoesNotExist:
        return Response({"error": "Surgical history record not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = SurgicalHistorySerializer(surgical_history)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_surgical_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        surgical_history = SurgicalHistory.objects.get(id=record_id, patient=patient)
    except SurgicalHistory.DoesNotExist:
        return Response({"error": "Surgical history record not found."}, status=status.HTTP_404_NOT_FOUND)
    
    # Update the allergy history record with the new data
    data = request.data.copy()
    data['patient'] = patient.id  # Ensure the patient ID stays the same
    data['date_added'] = surgical_history.date_added  # Keep the original date_added

    serializer = SurgicalHistorySerializer(surgical_history, data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_surgical_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        surgical_history = SurgicalHistory.objects.get(id=record_id, patient=patient)
    except SurgicalHistory.DoesNotExist:
        return Response({"error": "Surgical history record not found."}, status=status.HTTP_404_NOT_FOUND)

    # Set is_deleted to True
    surgical_history.is_deleted = True
    surgical_history.save()

    return Response({"message": "Surgical history record successfully deleted."}, status=status.HTTP_200_OK)


#VITAL SIGN HISTORY

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_vital_history_record(request, id):
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

    serializer = VitalHistorySerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_vital_history_records(request, id):   
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    vital_history = VitalHistory.objects.filter(patient=patient.id, is_deleted=False)

    paginator, paginated_vital_history = initialize_pagination(vital_history, request)

    serializer = VitalHistorySerializer(paginated_vital_history, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_single_vital_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        vital_history = VitalHistory.objects.get(id=record_id, patient=patient)
    except VitalHistory.DoesNotExist:
        return Response({"error": "Allergy history record not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = VitalHistorySerializer(vital_history)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_vital_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        vital_history = VitalHistory.objects.get(id=record_id, patient=patient)
    except VitalHistory.DoesNotExist:
        return Response({"error": "Vital history record not found."}, status=status.HTTP_404_NOT_FOUND)
    
    # Update the allergy history record with the new data
    data = request.data.copy()
    data['patient'] = patient.id  # Ensure the patient ID stays the same
    data['date_added'] = vital_history.date_added  # Keep the original date_added

    serializer = VitalHistorySerializer(vital_history, data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_vital_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        vital_history = VitalHistory.objects.get(id=record_id, patient=patient)
    except VitalHistory.DoesNotExist:
        return Response({"error": "Vital history record not found."}, status=status.HTTP_404_NOT_FOUND)

    # Set is_deleted to True
    vital_history.is_deleted = True
    vital_history.save()

    return Response({"message": "Vital history record successfully deleted."}, status=status.HTTP_200_OK)

#ALLERGY HISTORY 

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_allergy_history_record(request, id):
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

    serializer = AllergyHistorySerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_allergy_history_records(request, id):   
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    allergy_history = AllergyHistory.objects.filter(patient=patient.id, is_deleted=False)

    paginator, paginated_allergy_history = initialize_pagination(allergy_history, request)

    serializer = AllergyHistorySerializer(paginated_allergy_history, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_single_allergy_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        allergy_history = AllergyHistory.objects.get(id=record_id, patient=patient)
    except AllergyHistory.DoesNotExist:
        return Response({"error": "Allergy history record not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = AllergyHistorySerializer(allergy_history)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_allergy_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        allergy_history = AllergyHistory.objects.get(id=record_id, patient=patient)
    except AllergyHistory.DoesNotExist:
        return Response({"error": "Allergy history record not found."}, status=status.HTTP_404_NOT_FOUND)
    
    # Update the allergy history record with the new data
    data = request.data.copy()
    data['patient'] = patient.id  # Ensure the patient ID stays the same
    data['date_added'] = allergy_history.date_added  # Keep the original date_added

    serializer = AllergyHistorySerializer(allergy_history, data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_allergy_history_record(request, id, record_id):
    try:
        provider = Provider.objects.get(account=request.user.id)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found for this account."}, status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(id=id, provider=provider)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        allergy_history = AllergyHistory.objects.get(id=record_id, patient=patient)
    except AllergyHistory.DoesNotExist:
        return Response({"error": "Allergy history record not found."}, status=status.HTTP_404_NOT_FOUND)

    # Set is_deleted to True
    allergy_history.is_deleted = True
    allergy_history.save()

    return Response({"message": "Allergy history record successfully deleted."}, status=status.HTTP_200_OK)