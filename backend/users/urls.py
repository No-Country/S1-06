from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .api.views import MyTokenObtainPairView

app_name = 'users'

urlpatterns = [
    path('auth/token/', MyTokenObtainPairView.as_view(), name='token'),
    path(
        'auth/token/refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh'),
]
