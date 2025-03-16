import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import "../css/ChallengeList.styles.css"; // 챌린지 스타일 적용

const ChallengeList = () => {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Google Maps API가 로드되었는지 확인
    if (!window.google) {
      console.error("Google Maps API가 로드되지 않았습니다.");
      return;
    }

    const center: google.maps.LatLngLiteral = { lat: 37.5665, lng: 126.978 }; // 서울 좌표

    // 지도 생성
    const map = new google.maps.Map(mapRef.current, {
      center,
      zoom: 15,
    });

    // 마커 추가 (챌린지 위치)
    const challengeLocations: google.maps.LatLngLiteral[] = [
      { lat: 37.5705, lng: 126.9769 },
      { lat: 37.5641, lng: 126.9824 },
      { lat: 37.5683, lng: 126.9905 },
    ];

    challengeLocations.forEach((location) => {
      new google.maps.Marker({
        position: location,
        map,
      });
    });
  }, []);

  return (
    <div className="challengelist-container">
      <h2 className="challengelist-section-title">
        내 주변에서 진행되고 있는 챌린지에요!
      </h2>

      {/* Google 지도 */}
      <div ref={mapRef} className="map-container"></div>

      <h2 className="challengelist-section-title">참여자 수 급상승 챌린지</h2>

      {/* 챌린지 목록 */}
      <div className="challengelist-list">
        <div
          className="challengelist-card"
          onClick={() => navigate("/challengelist-detail")}
        >
          <p>분리수거 같이 해요~</p>
          <p>15분 남음</p>
          <p>3/10</p>
        </div>
        <div className="challengelist-card">
          <p>친환경 장바구니 사용</p>
          <p>2시간 남음</p>
          <p>5/10</p>
        </div>
      </div>

      <h2 className="challengelist-section-title">최신 등록 챌린지</h2>

      <div className="challengelist-list">
        <div className="challengelist-card">
          <p>텀블러 사용하기</p>
          <p>1시간 남음</p>
          <p>4/10</p>
        </div>
        <div className="challengelist-card">
          <p>플라스틱 줄이기</p>
          <p>45분 남음</p>
          <p>2/8</p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeList;
