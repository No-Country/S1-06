from django.urls import path

from rest_framework.routers import DefaultRouter

from .api.views import ApplicantUserViewSet

app_name = 'applicant'

router = DefaultRouter()
router.register(r'applicant', ApplicantUserViewSet, basename='applicant')
urlpatterns = router.urls

urlpatterns += [
    path(
        "applicant/<int:pk>/challenge/<int:challenge_id>/",
        ApplicantUserViewSet.as_view(
            {'post': 'complete_challenge', 'get': 'get_challenge'}
        ), name="applicant_challenge"
    ),
    path(
        "applicant/challenge/<int:challenge_id>/verify/",
        ApplicantUserViewSet.as_view(
            {'get': 'verify_challenge_complete'}
        ), name="applicant_challenge_verify"
    ),
    path(
        "applicant/<int:pk>/challenges/",
        ApplicantUserViewSet.as_view(
            {'get': 'get_all_challenges'}
        ), name="applicant_all_challenge"
    ),
    path(
        "applicant/<int:pk>/challenge/<int:challenge_id>/answers/",
        ApplicantUserViewSet.as_view(
            {'get': 'get_challenge_answers'}
        ), name="applicant_answers"
    ),
]

