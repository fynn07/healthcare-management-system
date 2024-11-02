from django.urls import path
from . import views

urlpatterns = [
    path("test_token/", views.user_token_auth),
    path("signup/", views.user_signup),
    path("login/", views.user_login),
    path("setup_provider/", views.setup_provider),
    path("patient/create/", views.create_patient),
    path("patient/fetch/", views.fetch_patients),
    path("patient/fetch/<int:id>/", views.fetch_single_patient),
    path("patient/fetch/<int:id>/medication_history/", views.fetch_medication_history_records),
    path("patient/fetch/<int:id>/vaccination_history/", views.fetch_vaccination_history_records),
    path("patient/fetch/<int:id>/family_history/", views.fetch_family_history_records),
    path("patient/create/<int:id>/medication_history/", views.create_medication_history_record),
    path("patient/create/<int:id>/vaccination_history/", views.create_vaccination_history_record),
    path("patient/create/<int:id>/family_history/", views.create_family_history_record),
]
