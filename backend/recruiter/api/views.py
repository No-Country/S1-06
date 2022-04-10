from django.contrib.auth import get_user_model
from rest_framework import viewsets
from .serializers import RecruiterUserSerializer


class RecruiterUserViewSet(viewsets.ModelViewSet):
    serializer_class = RecruiterUserSerializer
    queryset = get_user_model().objects.filter(is_recruiter=True)
