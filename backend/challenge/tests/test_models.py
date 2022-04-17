from django.test import TestCase
from challenge.models import Challenge, Question, Category


def sample_category():
    return Category.objects.create(name="python")


def sample_challenge(**params):
    defaults = {
        "title": "sample challenge",
        "level": "Junior",
        "description": 'this description',
        "category_id": 1
    }
    defaults.update(params)
    return Challenge.objects.create(**defaults)


class ChallengeModelTest(TestCase):
    def test_add_questions(self):
        sample_category()
        challenge = sample_challenge()
        payload = [
            {
                "title": "first",
                "challenge": challenge,
                "options": [
                    {
                        "text": 'option a',
                        "is_correct": False
                    },
                    {
                        "text": 'option b',
                        "is_correct": False
                    },
                    {
                        "text": 'option c',
                        "is_correct": False
                    },
                    {
                        "text": 'option d',
                        "is_correct": True
                    }
                ]
            }
        ]
        challenge.add_questions(payload)
        questions = challenge.questions.all()
        self.assertEqual(questions[0].title, payload[0]['title'])


class QuestionModelTest(TestCase):
    def test_add_options(self):
        sample_category()
        challenge = sample_challenge()
        questions = Question.objects.create(
            title="question1",
            challenge_id=challenge.id
        )
        payload = [
            {
                "text": 'option a',
                "is_correct": False
            },
            {
                "text": 'option b',
                "is_correct": False
            },
            {
                "text": 'option c',
                "is_correct": False
            },
            {
                "text": 'option d',
                "is_correct": True
            }
        ]
        questions.add_options(payload)
        option = questions.options.all()
        for index in range(0, len(payload)):
            self.assertEqual(option[index].text, payload[index]['text'])
