from rest_framework import serializers

from challenge.models import Category, Question, Option, Challenge


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('text', 'question', 'is_correct')
        extra_kwargs = {'question': {'read_only': True}}


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)
    challenge = serializers.PrimaryKeyRelatedField(
        queryset=Challenge.objects.all()
    )

    class Meta:
        model = Question
        fields = ('title', 'challenge', 'options')
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
            'questions'
        )
        extra_kwargs = {
            'category': {'write_only': True}, 'id': {'read_only': True}
        }
