import { useEffect, useRef } from "react";

interface Challenge {
  id: number;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

interface GoogleMapProps {
  challenges: Challenge[];
}

const GoogleMap: React.FC<GoogleMapProps> = ({ challenges }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const center = { lat: 37.5665, lng: 126.978 }; // 서울 기본 좌표

    const map = new google.maps.Map(mapRef.current, {
      center,
      zoom: 12,
    });

    challenges.forEach((challenge) => {
      new google.maps.Marker({
        position: {
          lat: challenge.location.latitude,
          lng: challenge.location.longitude,
        },
        map,
        title: challenge.name,
      });
    });
  }, [challenges]);

  return <div ref={mapRef} className="map-container" />;
};

export default GoogleMap;
