from rest_framework import serializers
from .models import Badge, UserBadge

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = '__all__'

class UserBadgeSerializer(serializers.ModelSerializer):
    badge = BadgeSerializer(read_only=True)  # 배지 정보 포함

    class Meta:
        model = UserBadge
        fields = ['id', 'user', 'badge', 'earned_at']
