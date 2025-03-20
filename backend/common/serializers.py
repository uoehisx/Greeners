from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    id = serializers.CharField(max_length=50)  # 문자열 ID
    username = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=50)

    class Meta:
        model = User
        fields = ['id', 'username', 'password']  # 사용자가 직접 ID를 입력

    extra_kwargs = {
        'password': {'write_only': True}
    }

    def create(self, validated_data):
        user = User.objects.create_user(
            id=validated_data['id'],  # 사용자가 입력한 ID 저장
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    id = serializers.CharField()  # 문자열 ID로 로그인
    password = serializers.CharField(write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)

    def validate(self, data):
        id = data.get("id")
        password = data.get("password")

        try:
            user = User.objects.get(id=id)  # ID로 사용자 찾기
        except User.DoesNotExist:
            raise serializers.ValidationError({"error": "존재하지 않는 사용자입니다."})

        if not user.check_password(password):
            raise serializers.ValidationError({"error": "비밀번호가 올바르지 않습니다."})

        refresh = RefreshToken.for_user(user)

        return {
            "id": user.id,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }

