from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import logout
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, LoginSerializer

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print("회원가입 요청 데이터:", request.data)  # 요청 데이터 출력

        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "id": user.id,
                "username": user.username,
                "message": "회원가입 성공"
            }, status=status.HTTP_201_CREATED)

        print("회원가입 실패 (유효성 검사 오류):", serializer.errors)  # 오류 로그 추가
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print("로그인 요청 데이터:", request.data)  # 요청 데이터 출력

        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            print("로그인 성공 응답 데이터:", serializer.validated_data)
            return Response(serializer.validated_data, status=status.HTTP_200_OK)

        print("로그인 실패 (유효성 검사 오류):", serializer.errors)  # 오류 로그 추가
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"error": "refresh 토큰이 필요합니다."}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"message": "로그아웃 성공"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response({"error": "유효하지 않은 토큰입니다."}, status=status.HTTP_400_BAD_REQUEST)

