import { useEffect, useRef } from "react";

const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Google Maps API가 로드되었는지 확인
    if (!window.google) {
      console.error("Google Maps API가 로드되지 않았습니다.");
      return;
    }

    const center: google.maps.LatLngLiteral = { lat: 37.5665, lng: 126.978 }; // 서울 좌표

    // 구글 지도 생성
    const map = new google.maps.Map(mapRef.current, {
      center,
      zoom: 15,
    });

    // 마커 추가 (예시 챌린지 위치)
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
    <div
      ref={mapRef}
      style={{ width: "90%", height: "200px", borderRadius: "10px" }}
    />
  );
};

export default GoogleMap;
