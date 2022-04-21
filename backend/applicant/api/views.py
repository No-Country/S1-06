from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ApplicantUserSerializer
from challenge.api.serializers import ChallengeCompleteSerializer
from challenge.models import ChallengeComplete

class ApplicantUserViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicantUserSerializer
    queryset = get_user_model().applicant.all()

    def get_challenge(self, pk, challenge_id):
        challenge = ChallengeComplete.objects.filter(
            applicant_id=pk,
            challenge_id=challenge_id
        )
        serializer = ChallengeCompleteSerializer(challenge)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def complete_challenge(self, request, pk, challenge_id):
        payload = request.data
        payload['challenge'] = challenge_id
        payload['applicant'] = pk
        serializer = ChallengeCompleteSerializer(data=payload)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def verify_challenge_complete(self, request, challenge_id):
        user = self.request.user
        challenge = ChallengeComplete.objects.filter(
            applicant=user,
            challenge_id=challenge_id
        ).all()
        return Response({"exits": challenge.exists()}, status=status.HTTP_200_OK)
