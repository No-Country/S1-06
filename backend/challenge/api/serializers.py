from django.contrib.auth import get_user_model

from rest_framework import serializers

from challenge.models import Category, Question, Option, Challenge, \
    ChallengeComplete, Answer
from users.api.serializers import UserSerializer
from recruiter.api.serializers import RecruiterProfileSerializer
from applicant.api.serializers import ApplicantUserSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('text', 'question', 'is_correct', 'id')
        extra_kwargs = {'question': {'read_only': True}, 'id': {'read_only': True}}


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)
    challenge = serializers.PrimaryKeyRelatedField(
        queryset=Challenge.objects.all()
    )

    class Meta:
        model = Question
        fields = ('id', 'title', 'challenge', 'options')
        extra_kwargs = {'id': {'read_only': True}}

    def create(self, validated_data):
        options = validated_data.pop('options')
        question = Question.objects.create(**validated_data)
        question.add_options(options)
        return question


class ChallengeSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all()
    )
    class Meta:
        model = Challenge
        fields = (
            'id',
            'title',
            'description',
            'category',
            'level',
            'questions',
            'created_by'
        )
        extra_kwargs = {
            'category': {'write_only': True},
            'id': {'read_only': True},
            "created_by": {'read_only': True}
        }

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        challenge = Challenge.objects.create(**validated_data)
        return challenge

    def to_representation(self, instance):
        data = super().to_representation(instance)
        user = get_user_model().objects.get(pk=data['created_by'])
        data['category'] = CategorySerializer(instance=Category.objects.get(pk=instance.category_id)).data
        data['created_by'] = {'user': UserSerializer(instance=user).data, "profile": {}}
        profile = {}
        if (user.is_recruiter):
            profile = RecruiterProfileSerializer(
                instance=user.recruiter_profile
            ).data
            data['created_by']['profile'] = profile
        return data

class QuestionSerializerDetail(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'title')
        extra_kwargs = {'id': {'read_only': True}}


class AnswerCreateSerializer(serializers.ModelSerializer):

    question = serializers.PrimaryKeyRelatedField(
        queryset=Question.objects.all()
    )
    choice = serializers.PrimaryKeyRelatedField(
        queryset=Option.objects.all()
    )
    class Meta:
        model = Answer
        fields = ('id', 'question', 'choice')
        extra_kwargs = {'id': {'read_only': True}}

class ChallengeCompleteSerializer(serializers.ModelSerializer):
    answers = AnswerCreateSerializer(many=True)
    challenge = serializers.PrimaryKeyRelatedField(
        queryset=Challenge.objects.all()
    )
    applicant = serializers.PrimaryKeyRelatedField(
        queryset=get_user_model().objects.all()
    )
    class Meta:
        model = ChallengeComplete
        fields = ('id', 'applicant', 'challenge', 'answers', 'score', 'duration')
        extra_kwargs = {
            'id': {'read_only': True},
        }

    def create(self, validated_data):
        challenge = validated_data.pop('challenge')
        answers = validated_data.pop('answers')
        applicant = validated_data.pop('applicant')
        duration = validated_data.pop('duration')
        challenge_complete = ChallengeComplete.objects.create(
            challenge=challenge,
            applicant=applicant,
            duration=duration
        )
        challenge_complete.add_answers(answers)

        return challenge_complete

    def to_representation(self, instance):
        return super().to_representation(instance)

class ChallengesApplicantSerializer(serializers.ModelSerializer):
    challenge = ChallengeSerializer()
    applicant = serializers.PrimaryKeyRelatedField(
        queryset=get_user_model().objects.all()
    )
    class Meta:
        model = ChallengeComplete
        fields = ('id', 'applicant', 'challenge', 'score', 'duration')


class ChallengesRecruiterSerializer(serializers.ModelSerializer):
    applicant = ApplicantUserSerializer()
    class Meta:
        model = ChallengeComplete
        fields = ('id', 'applicant', 'score', 'challenge', 'duration')

