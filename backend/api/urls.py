from django.urls import path
from .views import test_api

urlpatterns = [
    path('test/', test_api),  # React에서 호출할 API
]