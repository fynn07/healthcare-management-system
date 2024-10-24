from django.urls import path
from . import views

urlpatterns = [
    path("test_token/", views.user_token_auth),
    path("signup/", views.user_signup),
    path("login/", views.user_login),
    path("setup_provider/", views.setup_provider)
]
