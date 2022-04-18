from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from challenge.models import Challenge, Category
from challenge.api.serializers import ChallengeSerializer

CHALLENGE_URL = reverse('challenge:challenge-list')


def sample_category():
    return Category.objects.create(name="python")


def detail_url(challenge_id):
    return reverse('challenge:challenge-detail', args=[challenge_id])


def questions_url(challenge_id):
    return reverse('challenge:challenge_questions', args=[challenge_id])


def sample_challenge(**params):
    defaults = {
        "title": "sample challenge",
        "level": "Junior",
        "description": 'this description',
        "category_id": 1,
        "created_by_id": 1
    }

    defaults.update(params)
    return Challenge.objects.create(**defaults)


class PrivateChallengeApiTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.recruiter = get_user_model().objects.create_user(
                'test@test.com',
                'testpass',
                is_recruiter=True
        )
        self.client.force_authenticate(self.recruiter)

    def test_retrieve_challenge(self):
        sample_category()
        sample_challenge()
        sample_challenge()

        res = self.client.get(CHALLENGE_URL)

        challenges = Challenge.objects.all()
        serializer = ChallengeSerializer(challenges, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_view_challenge_detail(self):
        challenge = sample_challenge()
        url = detail_url(challenge.id)
        res = self.client.get(url)
        serializer = ChallengeSerializer(challenge)
        self.assertEqual(res.data, serializer.data)

    def test_create_challenge_successful(self):
        sample_category()
        payload = {
            "title": "sample challenge",
            "level": "Junior",
            "description": 'this description',
            "category": 1
        }
        self.client.post(CHALLENGE_URL, payload)
        exists = Challenge.objects.filter(
            title__contains=payload['title']
        ).exists()
        self.assertTrue(exists)

    def test_create_product_invalid(self):
        payload = {
            "title": "",
            "level": "",
            "description": 'this description',
            "category": 1
        }
        res = self.client.post(CHALLENGE_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_partial_update_product(self):
        sample_category()
        challenge = sample_challenge()
        payload = {
            "title": "sample challenge3",
        }
        url = detail_url(challenge.id)
        self.client.patch(url, payload)
        challenge.refresh_from_db()
        self.assertEqual(challenge.title, payload['title'])

    def test_full_update_product(self):
        sample_category()
        sample_category()
        challenge = sample_challenge()
        payload = {
            "title": "sample challenge3",
            "level": "Senior",
            "description": 'thisss description',
            "category": 2
        }
        url = detail_url(challenge.id)
        self.client.put(url, payload)

        challenge.refresh_from_db()
        self.assertEqual(challenge.title, payload['title'])
        self.assertEqual(challenge.level, payload['level'])
        self.assertEqual(challenge.category.id, payload['category'])
        self.assertEqual(challenge.description, payload['description'])

    def test_get_questions(self):
        sample_category()
        challenge = sample_challenge()
        option_payload = [
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
        payload = [
            {
                "title": "first",
                "challenge": challenge,
                "options": option_payload
            }
        ]
        challenge.add_questions(payload)
        url = questions_url(challenge.id)
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        questions = res.data
        self.assertEqual(len(questions), len(payload))

    def test_create_questions(self):
        sample_category()
        challenge = sample_challenge()
        option_payload = [
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
        payload = [
            {
                "title": "first",
                "challenge": challenge.id,
                "options": option_payload
            }
        ]
        url = questions_url(challenge.id)
        res = self.client.post(url, data=payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        questions = res.data
        self.assertEqual(questions[0]['title'], payload[0]['title'])
        for index in range(0, 3):
            self.assertEqual(
                option_payload[index]['text'],
                questions[0]['options'][index]['text'])
