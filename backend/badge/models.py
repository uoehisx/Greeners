from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Badge(models.Model):
    BADGE_TYPES = (
        (1, '텀블러 사용'),
        (2, '메일 삭제'),
        (3, '기타'),
    )

    name = models.CharField(max_length=100)  # 배지 이름
    description = models.TextField()  # 배지 설명
    badge_type = models.IntegerField(choices=BADGE_TYPES)  # 배지 유형
    image = models.ImageField(upload_to="badges/", null=True, blank=True)  # 배지 이미지

    def __str__(self):
        return self.name

class UserBadge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_badges")
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    earned_at = models.DateTimeField(auto_now_add=True)  # 배지를 얻은 날짜

    def __str__(self):
        return f"{self.user.username} - {self.badge.name}"
