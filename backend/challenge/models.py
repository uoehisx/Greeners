from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import timedelta

STATUS = (
    ('CL', 'closed'),
    ('PR', 'in-progress')
)

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
    status = models.CharField(
        max_length=50,
        choices=STATUS)
    start_time = models.DateTimeField(auto_now_add=True)  # 자동으로 현재 시간 입력
    end_time = models.DateTimeField(null=True, blank=True)  # 사용자로부터 입력 받을 필드
    current_participants = models.IntegerField()
    max_participants = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(20)])
    

    def __str__(self):
        return self.name
