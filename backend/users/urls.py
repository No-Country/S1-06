from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = 'users'

urlpatterns = [
    path('auth/token/', TokenObtainPairView.as_view(), name='token'),
    path(
        'auth/token/refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh'),
]
