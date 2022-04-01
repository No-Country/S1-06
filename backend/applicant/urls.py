from rest_framework.routers import DefaultRouter

from .api.views import ApplicantUserViewSet

app_name = 'applicant'

router = DefaultRouter()
router.register(r'applicant', ApplicantUserViewSet, basename='applicant')
urlpatterns = router.urls

urlpatterns += []
