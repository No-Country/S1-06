from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=255)


class Challenge(models.Model):
    LEVELS = (
        ('Junior', 'Junior'),
        ('Semisenior', 'Semisenior'),
        ('Senior', 'Senior')
    )
    DURATION = (
        ('5 Minutos', '5 Minutos'),
        ('10 Minutos', '10 Minutos'),
        ('15 Minutos', '15 Minutos'),
        ('25 Minutos', '25 Minutos'),
        ('30 Minutos', '30 Minutos'),
        ('45 Minutos', '45 Minutos'),
        ('60 Minutos', '60 Minutos')
    )

    title = models.CharField(_('title'), max_length=255)
    description = models.TextField(_('description'))
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    level = models.CharField(max_length=255, choices=LEVELS)
    duration = models.CharField(max_length=255, choices=DURATION, default="5 Minutos")
    created_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="challenges"
    )

    def add_questions(self, questions):
        for question in questions:
            options = question.pop('options')
            res = Question.objects.create(challenge_id=self.id, **question)
            res.add_options(options)


class Question(models.Model):
    title = models.CharField(_('title'), max_length=255)
    challenge = models.ForeignKey(
        Challenge,
        on_delete=models.CASCADE,
        related_name='questions'
    )

    def add_options(self, options):
        for option in options:
            Option.objects.create(question_id=self.id, **option)


class Option(models.Model):
    text = models.CharField(_('text'), max_length=255)
    question = models.ForeignKey(
        Question,
        related_name="options",
        on_delete=models.CASCADE
    )
    is_correct = models.BooleanField(default=False)

class ChallengeComplete(models.Model):
    applicant = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="challenge_complete"
    )
    challenge = models.ForeignKey(
        Challenge,
        on_delete=models.CASCADE,
        related_name="challenge_complete"
    )
    duration = models.TimeField(null=True , blank=True)

    @property
    def score(self):
        answers = self.answers.select_related('choice').all()
        count = 0
        for answer in answers:
            if (answer.choice.is_correct == True):
                count = count + 1
        return f"{count} de {len(answers)}"

    def add_answers(self, answers):
        for answer in answers:
            answer['challenge_applicant_id'] = self.id
            Answer.objects.create(**answer)

class Answer(models.Model):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="answers"
    )

    choice = models.ForeignKey(
        Option,
        on_delete=models.CASCADE,
        related_name="answers"
    )

    challenge_applicant = models.ForeignKey(
        ChallengeComplete,
        on_delete=models.CASCADE,
        related_name="answers"
    )
