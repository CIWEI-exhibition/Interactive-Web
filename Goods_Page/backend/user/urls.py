from django.urls import path

from .views import (
    SignUpView,
    SignInView,
    Activate,
)

urlpatterns = [
    path('/signup', SignUpView.as_view()),
    path('/signin', SignInView.as_view()),
    path('/activate/<str:uidb64>/<str:token>', Activate.as_view()),
]