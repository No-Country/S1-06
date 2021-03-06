from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework.decorators import action
from drf_yasg.utils import swagger_auto_schema

from challenge.models import Category, Challenge, ChallengeComplete
from challenge.api.serializers import ChallengeSerializer, \
    QuestionSerializer, CategorySerializer, ChallengesRecruiterSerializer
from challenge.permissions import isRecruiterOrAdmin


class ChallengeViewsets(viewsets.ModelViewSet):
    serializer_class = ChallengeSerializer
    queryset = Challenge.objects.all()
#    permission_classes = (IsAuthenticated, isRecruiterOrAdmin)

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__name__contains=category).all()
        return queryset

    # def get_permissions(self):
    #     if self.request.method == 'GET':
    #         return [IsAuthenticated()]
    #     return (IsAuthenticated(), isRecruiterOrAdmin(),)

    @swagger_auto_schema(request_body=QuestionSerializer(many=True))
    def create_questions(self, request, pk):
        payload = request.data
        serializer = QuestionSerializer(data=payload, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={200: QuestionSerializer(many=True)})
    def get_questions(self, request,  pk):
        challenge = self.get_object()
        questions = challenge.questions.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['GET'], detail=True)
    def applicants(self, request, pk):
        challenges = self.get_object().challenge_complete.all()
        serializer = ChallengesRecruiterSerializer(challenges, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CategoryAPIView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
