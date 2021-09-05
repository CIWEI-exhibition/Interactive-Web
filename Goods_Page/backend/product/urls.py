from django.urls import path

from .views import (
    DetailView,
    FilterView,
    MainPageView,
    SearchBarView,
    ShoeCategoryView
)

urlpatterns = [
    path('', MainPageView.as_view()),
    path('/detail/<product_id>', DetailView.as_view()),
    # path('/search', SearchBarView.as_view()),
    # path('/<category_name>', ShoeCategoryView.as_view()),
    # path('/<category_name>/filter', FilterView.as_view()),
]