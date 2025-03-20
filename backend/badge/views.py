from rest_framework import generics, pagination
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import UserBadge
from .serializers import UserBadgeSerializer

class UserBadgePagination(pagination.PageNumberPagination):
    page_size = 10  # 기본 10개씩 표시
    page_size_query_param = 'size'  # 쿼리 파라미터로 크기 조절 가능
    max_page_size = 50  # 최대 50개까지 조회 가능

class UserBadgeListView(generics.ListAPIView):
    serializer_class = UserBadgeSerializer
    permission_classes = [IsAuthenticated]  # 인증된 사용자만 접근 가능
    pagination_class = UserBadgePagination
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['badge__badge_type']  # badgeType 필터링 가능
    ordering_fields = ['earned_at']  # 정렬 가능

    def get_queryset(self):
        return UserBadge.objects.filter(user=self.request.user)

