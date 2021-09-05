import json

from django.test import (
    TestCase,
    Client,
)

from .models import (
    Gender,
    User
)

class SignUpTest(TestCase):

    def setUp(self):
        Gender.objects.create(name='남성')

    def tearDown(self):
        User.objects.all().delete()

    def test_signupview_post_success(self):
        client = Client()
        user = {
            'email'        : 'test11@test.com',
            'password'     : 'test1!dddd',
            'name'         : 'test10',
            'phone_number' : '01012341234',
            'gender'       : '남성',
            'birth_date'   : '2020-07-22'
        }
        response = client.post('/user/signup', json.dumps(user), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message" : "SUCCESS"})
    
    def test_signupview_post_duplicated_user(self):
        client = Client()
        User.objects.create(
            email        = 'test@test.com',
            password     = 'test1!dddd',
            name         = 'test',
            phone_number = '01011111234',
            gender       = Gender.objects.get(name = '남성'),
            birth_date   = '2020-07-22'
        )
        user = {
            'email'        : 'test@test.com',
            'password'     : 'test1!dddd',
            'name'         : 'test',
            'phone_number' : '01011111234',
            'gender'       : '남성',
            'birth_date'   : '2020-07-22'
        }
        response = client.post('/user/signup', json.dumps(user), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"message" : "EXISTING_ACCOUNT"})

    def test_signupview_post_validation_error(self):
        client = Client()
        user = {
            'email'        : 'test@test.com',
            'password'     : 'test1dddd',
            'name'         : 'test',
            'phone_number' : '01012341234',
            'gender'       : '남성',
            'birth_date'   : '2020-07-22'
        }
        response = client.post('/user/signup', json.dumps(user), content_type='application/json')
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {"message" : "VALIDATION_ERROR"})