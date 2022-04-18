from rest_framework import serializers
from django.contrib.auth import get_user_model
from recruiter.models import RecruiterProfile
from users.models import Location


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('country', 'city', 'postal_code')
        ref_name = 'RecruiterLocation'


class RecruiterProfileSerializer(serializers.ModelSerializer):
    location = LocationSerializer()

    class Meta:
        model = RecruiterProfile
        fields = ('phone', 'name', 'location')


class RecruiterUserSerializer(serializers.ModelSerializer):
    recruiter_profile = RecruiterProfileSerializer()

    class Meta:
        model = get_user_model()
        fields = (
            'email',
            'password',
            'recruiter_profile',
            'is_active',
            'is_recruiter'
        )
        read_only_fields = ('is_active', 'is_recruiter')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'min_length': 5,
            },
        }

    def create(self, validated_data):
        location_data = validated_data['recruiter_profile'].pop('location')
        profile_data = validated_data.pop('recruiter_profile')
        location = Location.objects.create(**location_data)
        user = get_user_model().objects.create_user(
            is_active=True,
            is_recruiter=True,
            **validated_data
        )
        RecruiterProfile.objects.create(
            **profile_data,
            user=user,
            location=location
        )
        return user
