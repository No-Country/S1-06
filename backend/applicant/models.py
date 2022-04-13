from django.db import models
from django.contrib.auth import get_user_model
from users.models import Profilable, Location


class ApplicantProfile(Profilable, models.Model):
    user = models.OneToOneField(
        get_user_model(),
        related_name='applicant_profile',
        on_delete=models.CASCADE
    )
    birthday = models.DateField(blank=True, null=True)
    location = models.OneToOneField(
        Location,
        related_name='applicant_profile',
        on_delete=models.CASCADE
    )

    @property
    def age(self):
        return ''
