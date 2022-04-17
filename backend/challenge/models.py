from django.db import models
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
    title = models.CharField(_('title'), max_length=255)
    description = models.TextField(_('description'))
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    level = models.CharField(max_length=255, choices=LEVELS)

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
