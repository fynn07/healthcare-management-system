from django.contrib import admin
from .models import Provider, Patient, MedicationHistory, VaccinationHistory, SocialHistory, FamilyHistory

# Register your models here.
admin.site.register(Provider)
admin.site.register(Patient)
admin.site.register(MedicationHistory)
admin.site.register(VaccinationHistory)
admin.site.register(SocialHistory)
admin.site.register(FamilyHistory)