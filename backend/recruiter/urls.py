from rest_framework.routers import DefaultRouter

from .api.views import RecruiterUserViewSet

app_name = 'recruiter'

router = DefaultRouter()
router.register(r'recruiter', RecruiterUserViewSet, basename='recruiter')
urlpatterns = router.urls

urlpatterns += []
