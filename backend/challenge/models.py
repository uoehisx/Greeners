from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import timedelta

# Location 모델 정의
class Location(models.Model):
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.address

# Challenge 모델 정의
class Challenge(models.Model):
    # Challenge 모델 필드
    name = models.CharField(max_length=100)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)  # 위치는 Location 모델로 참조
    status = models.CharField(max_length=50)  # 상태는 최대 50자로 제한
    start_time = models.DateTimeField(auto_now_add=True)  # 자동으로 현재 시간 입력
    end_time = models.DateTimeField(null=True, blank=True)  # 사용자로부터 입력 받을 필드
    max_participants = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(20)])
    duration_in_hours = models.IntegerField(validators=[MinValueValidator(1)], default=6)  # 시간 단위로 기간 설정, 기본값은 6시간

    def save(self, *args, **kwargs):
        # end_time이 계산되지 않았다면 duration_in_hours를 기준으로 자동 계산
        if not self.end_time:
            self.end_time = self.start_time + timedelta(hours=self.duration_in_hours)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
