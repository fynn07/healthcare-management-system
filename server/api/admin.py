from django.contrib import admin
from .models import Provider, Patient, MedicationHistory

# Register your models here.
admin.site.register(Provider)
admin.site.register(Patient)
admin.site.register(MedicationHistory)
