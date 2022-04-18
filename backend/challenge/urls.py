from django.urls import path

from rest_framework.routers import DefaultRouter

from challenge.api.views import ChallengeViewsets, CategoryAPIView

app_name = 'challenge'

router = DefaultRouter()
router.register(r'challenges', ChallengeViewsets, basename='challenge')
router.register(r'categories', CategoryAPIView, basename='category')
urlpatterns = router.urls

urlpatterns += [
    path(
        "challenges/<int:pk>/questions/",
        ChallengeViewsets.as_view(
            {'get': 'get_questions', 'post': 'create_questions'}
        ), name="challenge_questions"
    ),
]
