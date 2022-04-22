from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import RecruiterUserSerializer

from challenge.api.serializers import ChallengeSerializer

class RecruiterUserViewSet(viewsets.ModelViewSet):
    serializer_class = RecruiterUserSerializer
    queryset = get_user_model().recruiter.all()

    @action(methods=['GET'], detail=True)
    def challenges(self, request, pk):
        challenges = self.get_object().challenges.all()
        serializer = ChallengeSerializer(challenges, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
