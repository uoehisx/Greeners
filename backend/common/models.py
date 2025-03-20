from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):  # Django 기본 User 모델 확장
    id = models.CharField(max_length=50, primary_key=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)

    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="custom_user_permissions",  # 기본 'user_set'이 아닌 새로운 related_name 사용
        blank=True,
    )

    def __str__(self):
        return self.username

