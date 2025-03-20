from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.utils.dateparse import parse_datetime
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from .models import Challenge, Location
#from badge.models import Badge, UserBadge
from django.db.models import Q
import json

# 챌린지 상태 조회 및 필터링
@require_http_methods(["GET"])
def challenge_status(request):
    challenges = Challenge.objects.filter(status='in-progress')

    # 쿼리 파라미터 처리
    filters = {
        'type': request.GET.get('type'),
        'deadline': request.GET.get('deadline'),
        'location': request.GET.get('location'),
        'radius': request.GET.get('radius'),
        'max_participants': request.GET.get('max_participants')
    }

    # 필터링 처리
    if filters['type']:
        challenges = challenges.filter(name__icontains=filters['type'])

    if filters['deadline']:
        deadline_date = parse_datetime(filters['deadline'])
        if deadline_date:
            challenges = challenges.filter(end_time__lte=deadline_date)

    if filters['location']:
        challenges = challenges.filter(location__address__icontains=filters['location'])

    if filters['max_participants']:
        challenges = challenges.filter(max_participants__lte=filters['max_participants'])

    # 결과가 없다면 404 반환
    if not challenges.exists():
        return JsonResponse({
            "message": "해당 조건에 해당하는 진행 중인 챌린지가 없습니다."
        }, status=404)

    # 필터링된 챌린지 리스트 반환
    data = [{
        "id": challenge.id,
        "name": challenge.name,
        "location": {
            "latitude": challenge.location.latitude,
            "longitude": challenge.location.longitude,
            "address": challenge.location.address,
        },
        "status": challenge.status,
        "start_time": challenge.start_time.isoformat(),
        "end_time": challenge.end_time.isoformat(),
        "current_participants": challenge.current_participants,
        "max_participants": challenge.max_participants,
    } for challenge in challenges]

    return JsonResponse({
        "message": "진행 중인 챌린지 목록 조회 성공",
        "data": data
    }, status=200)

# 챌린지 생성
@require_http_methods(["POST"])
def upload_challenge(request):
    try:
        data = json.loads(request.body)

        # 필수 필드 체크
        required_fields = ['name', 'location', 'status', 'start_time', 'end_time', 'max_participants']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return JsonResponse({
                "message": f"Missing required fields: {', '.join(missing_fields)}"
            }, status=400)

        # 위치 정보 처리
        location_data = data.get('location')
        if not location_data or not all(k in location_data for k in ['latitude', 'longitude', 'address']):
            return JsonResponse({
                "message": "'location' with 'latitude', 'longitude', and 'address' is required."
            }, status=400)

        # Location 모델에 위치 저장
        location = Location.objects.create(
            latitude=location_data['latitude'],
            longitude=location_data['longitude'],
            address=location_data['address']
        )

        # 날짜 검증
        start_time = parse_datetime(data['start_time'])
        end_time = parse_datetime(data['end_time'])

        if not start_time or not end_time:
            return JsonResponse({
                "message": "'start_time' and 'end_time' should be in ISO format (YYYY-MM-DDTHH:MM:SS)."
            }, status=400)

        # 챌린지 모델에 데이터 저장
        challenge = Challenge.objects.create(
            name=data['name'],
            location=location,
            status=data['status'],
            start_time=start_time,
            end_time=end_time,
            max_participants=data['max_participants']
        )

        return JsonResponse({
            "message": "챌린지 생성 성공",
            "data": {
                "id": challenge.id,
                "name": challenge.name,
                "location": {
                    "latitude": challenge.location.latitude,
                    "longitude": challenge.location.longitude,
                    "address": challenge.location.address
                },
                "status": challenge.status,
                "start_time": challenge.start_time.isoformat(),
                "end_time": challenge.end_time.isoformat(),
                "max_participants": challenge.max_participants
            }
        }, status=201)

    except json.JSONDecodeError:
        return JsonResponse({
            "message": "잘못된 JSON 형식입니다."
        }, status=400)
    except ValidationError as e:
        return JsonResponse({
            "message": str(e)
        }, status=400)
    except Exception as e:
        return JsonResponse({
            "message": f"서버 오류: {str(e)}"
        }, status=500)

# 챌린지 성공 기록 및 배지 획득
# @require_http_methods(["POST"])
# def challenge_success(request):
#     try:
#         data = json.loads(request.body)
#         challenge_id = data.get('id')

#         if not challenge_id:
#             return JsonResponse({
#                 "message": "'id' is required."
#             }, status=400)

#         challenge = get_object_or_404(Challenge, id=challenge_id)

#         if challenge.status == 'completed':
#             return JsonResponse({
#                 "message": "이미 완료된 챌린지입니다."
#             }, status=400)

#         challenge.status = 'completed'
#         challenge.save()

#         # 배지 부여 - 예시로 배지 type 1을 부여
#         badge = Badge.objects.get(type=1)  # 배지 타입 1: 메일 삭제 챌린지

#         # UserBadge 모델에 배지 기록 추가
#         UserBadge.objects.create(user=request.user, badge=badge, challenge=challenge)

#         return JsonResponse({
#             "message": "챌린지 성공 기록 및 배지 획득 완료",
#             "badge": {
#                 "badgeType": badge.type,
#                 "badgeName": badge.name
#             }
#         }, status=200)

#     except Badge.DoesNotExist:
#         return JsonResponse({
#             "message": "배지를 찾을 수 없습니다."
#         }, status=404)
#     except KeyError:
#         return JsonResponse({
#             "message": "잘못된 요청입니다."
#         }, status=400)
#     except Exception as e:
#         return JsonResponse({
#             "message": f"서버 오류: {str(e)}"
#         }, status=500)

# 챌린지 실패 기록
@require_http_methods(["POST"])
def challenge_fail(request):
    try:
        data = json.loads(request.body)
        challenge_id = data.get('id')

        if not challenge_id:
            return JsonResponse({
                "message": "'id' is required."
            }, status=400)

        challenge = get_object_or_404(Challenge, id=challenge_id)

        if challenge.status == 'completed':
            return JsonResponse({
                "message": "이미 완료된 챌린지입니다."
            }, status=400)

        challenge.status = 'failed'
        challenge.save()

        return JsonResponse({
            "message": "챌린지 실패 기록 완료"
        }, status=200)

    except KeyError:
        return JsonResponse({
            "message": "잘못된 요청입니다."
        }, status=400)
    except Exception as e:
        return JsonResponse({
            "message": f"서버 오류: {str(e)}"
        }, status=500)
