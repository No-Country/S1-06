from django.db import models
from django.contrib.auth import get_user_model
from users.models import Profilable, Location


class RecruiterProfile(Profilable, models.Model):
    name = models.CharField(max_length=100)
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
