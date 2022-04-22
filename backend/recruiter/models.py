from django.db import models
from django.contrib.auth import get_user_model
from users.models import Location


class RecruiterProfile(models.Model):
    name = models.CharField(max_length=100)
    request_reason = models.CharField(default="", max_length=255, blank=True)
    phone = models.CharField(max_length=100, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, default="")
    user = models.OneToOneField(
        get_user_model(),
        related_name='recruiter_profile',
        on_delete=models.CASCADE
    )
    location = models.OneToOneField(
        Location,
        related_name='recruiter_profile',
        on_delete=models.CASCADE
    )
