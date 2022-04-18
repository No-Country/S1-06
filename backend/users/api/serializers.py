from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from applicant.api.serializers import ApplicantProfileSerializer
from recruiter.api.serializers import RecruiterProfileSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            'id',
            'email',
            'is_superuser',
            'is_applicant',
            'is_recruiter'
        )


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        data.update({'user': UserSerializer(instance=self.user).data})
        profile = {}
        if (self.user.is_applicant):
            profile = ApplicantProfileSerializer(
                instance=self.user.applicant_profile
            ).data
        elif (self.user.is_recruiter):
            profile = RecruiterProfileSerializer(
                instance=self.user.recruiter_profile
            ).data
        data.update({'profile': profile})
        return data
