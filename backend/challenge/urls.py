from django.urls import path
from .views import upload_challenge, challenge_status

urlpatterns = [
    path('post/', upload_challenge, name='upload_challenge'),
    path('status/', challenge_status, name='get_challenge_status'),
]
