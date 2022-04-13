from django.contrib.auth import get_user_model
from rest_framework import viewsets
from .serializers import ApplicantUserSerializer


class ApplicantUserViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicantUserSerializer
    queryset = get_user_model().applicant.all()
