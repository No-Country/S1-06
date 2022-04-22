from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from .serializers import ApplicantUserSerializer
from challenge.api.serializers import ChallengeCompleteSerializer, \
    ChallengesApplicantSerializer, AnswerCreateSerializer
from challenge.models import ChallengeComplete, Answer

class ApplicantUserViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicantUserSerializer
    queryset = get_user_model().applicant.all()

    @swagger_auto_schema(responses={200: ChallengesApplicantSerializer})
    def get_challenge(self, pk, challenge_id):
        challenge = ChallengeComplete.objects.filter(
            applicant_id=pk,
            challenge_id=challenge_id
        )
        serializer = ChallengesApplicantSerializer(challenge)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_all_challenges(self, request, pk):
        challenge = ChallengeComplete.objects.filter(applicant_id=pk)
        serializer = ChallengesApplicantSerializer(challenge, many=True)
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

    def get_challenge_answers(self, requests, pk, challenge_id):
        answers = Answer.objects.filter(
            challenge_applicant__applicant=pk,
            challenge_applicant__challenge__id=challenge_id
        )
        serializer = AnswerCreateSerializer(answers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
