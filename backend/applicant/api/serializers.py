from rest_framework import serializers
from django.contrib.auth import get_user_model
from applicant.models import ApplicantProfile
from users.models import Location
from users.api.serializers import LocationSerializer


class ApplicantProfileSerializer(serializers.ModelSerializer):
    location = LocationSerializer()

    class Meta:
        model = ApplicantProfile
        fields = (
            'first_name',
            'last_name',
            'phone',
            'birthday',
            'dni',
            'location'
        )


class ApplicantUserSerializer(serializers.ModelSerializer):

    applicant_profile = ApplicantProfileSerializer()

    class Meta:
        model = get_user_model()
        fields = (
            'email',
            'password',
            'applicant_profile',
            'is_active',
            'is_applicant'
        )
        read_only_fields = ('is_active', 'is_applicant')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'min_length': 5,
            },
        }

    def create(self, validated_data):
        location_data = validated_data['applicant_profile'].pop('location')
        profile_data = validated_data.pop('applicant_profile')
        location = Location.objects.create(**location_data)
        user = get_user_model().objects.create_user(
            is_active=True,
            is_applicant=True,
            **validated_data
        )
        ApplicantProfile.objects.create(
            **profile_data,
            user=user,
            location=location
        )
        return user
