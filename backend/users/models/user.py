from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
                                        PermissionsMixin


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save()

        return user

class RecruiterManager(models.Manager):
    def get_queryset(self):
        return super(RecruiterManager, self).get_queryset()\
            .filter(is_recruiter=True)

class ApplicantManager(models.Manager):
    def get_queryset(self):
        return super(ApplicantManager, self).get_queryset()\
            .filter(is_applicant=True)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_recruiter = models.BooleanField(default=False)
    is_applicant = models.BooleanField(default=False)

    objects = UserManager()
    recruiter = RecruiterManager()
    applicant = ApplicantManager()

    USERNAME_FIELD = 'email'
