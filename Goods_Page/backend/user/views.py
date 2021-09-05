import json
import jwt
import bcrypt

from django.shortcuts               import redirect
from django.views                   import View
from django.http                    import JsonResponse
from django.db.models               import Q
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http              import (
    urlsafe_base64_encode,
    urlsafe_base64_decode,
)
from django.core.mail               import EmailMessage
from django.utils.encoding          import (
    force_bytes,
    force_text
)
from django.core.exceptions         import ValidationError

from converse.settings import (
    SECRET_KEY,
    ALGORITHM
)
from .models           import (
    User,
    Gender,
)
from my_settings       import EMAIL
from text              import message

def email_validation(email):
    lambdas = [
        lambda x : '@' in x,
        lambda x : '.' in x
    ]
    for lam in lambdas:
        if not lam(email):
            return True
    return False

def password_validation(password):
    if len(password) < 8:
        return True
    lambdas = [
        lambda x : x in ['!', '@', '#', '$', '%', '&', '*'],
        lambda x : x in [str(i) for i in range(10)]
    ]
    for lam in lambdas:
        if not any(lam(i) for i in password):
            return True
    return False

class SignUpView(View):
    def post(self, request):
        data = json.loads(request.body)
        try:
            if email_validation(data['email']) or password_validation(data['password']):
                return JsonResponse({'message' : 'VALIDATION_ERROR'}, status=401)
            if User.objects.filter(Q(email=data['email']) | Q(phone_number=data['phone_number'])).exists():
                return JsonResponse({'message' : 'EXISTING_ACCOUNT'}, status=400)
            hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
            user = User.objects.create(
                name         = data['name'],
                phone_number = data['phone_number'],
                birth_date   = data['birth_date'],
                gender_id    = Gender.objects.get(name = data['gender']).id,
                email        = data['email'],
                password     = hashed_password.decode('utf-8'),
                is_active    = False
            )
            current_site = get_current_site(request)
            domain = current_site.domain
            uidb64 = urlsafe_base64_encode(force_bytes(user.id))
            token = jwt.encode({'user_id' : user.id}, SECRET_KEY, ALGORITHM)
            message_data = message(domain, uidb64, token.decode('utf-8'))

            mail_title = "이메일 인증을 완료해주세요"
            mail_to = data['email']
            email = EmailMessage(mail_title, message_data, to=[mail_to])
            email.send()
            
            return JsonResponse({'message' : 'SUCCESS'}, status = 200)
        except KeyError:
            return JsonResponse({'message' : 'KEY_ERROR'}, status = 400)

class SignInView(View):
    def post(self, request):
        data = json.loads(request.body)
        try:
            if email_validation(data['email']):
                return JsonResponse({'message' : 'VALIDATION_ERROR'}, status=401)
            if User.objects.filter(email = data['email']).exists():
                user = User.objects.get(email = data['email'])
                if user.is_active:
                    if bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
                        access_token =  jwt.encode({'user_id' : user.id}, SECRET_KEY, ALGORITHM)
                        return JsonResponse({'access_token' : access_token.decode('utf-8')}, status = 200)
                    return JsonResponse({'message' : 'UNAUTHORIZED'}, status=401)
                return JsonResponse({'message' : 'INACTIVE'}, status = 401)
            return JsonResponse({'message' : 'UNAUTHORIZED'}, status = 401)
        except KeyError:
            return JsonResponse({'message' : 'KEY_ERROR'}, status = 400)

class Activate(View):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=uid)
            if user.id == jwt.decode(token, SECRET_KEY, ALGORITHM)['user_id']:
                user.is_active = True
                user.save()

                return redirect(EMAIL['REDIRECT_PAGE'])
            return JsonResponse({'message' : 'AUTH FAIL'}, status=400)
        except ValidationError:
            return JsonResponse({'message' : 'TYPE_ERROR'}, status=400)
        except KeyError:
            return JsonResponse({'message' : 'INVALID_KEY'}, status=400)