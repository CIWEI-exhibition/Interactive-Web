import os
import sys
import django
import jwt

from django.http import JsonResponse

from converse.settings import (
    SECRET_KEY,
    ALGORITHM
)

def login_required(func):
    def wrapper(self, request):
        try:
            token = request.headers['Authorization']
            user = jwt.decode(token, SECRET_KEY, ALGORITHM)
            user_id = user['user_id']
            return func(self, request, user_id)
        except KeyError:
            return JsonResponse({'message' : 'UNAUTHORIZED'}, status=401)
    return wrapper