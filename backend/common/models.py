from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):  # Django 기본 User 모델 확장
    email = models.EmailField(unique=True)
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)

    groups = models.ManyToManyField(
        "auth.Group",
        related_name="custom_user_groups",  # 기본 'user_set'이 아닌 새로운 related_name 사용
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="custom_user_permissions",  # 기본 'user_set'이 아닌 새로운 related_name 사용
        blank=True,
    )

    def __str__(self):
        return self.username

