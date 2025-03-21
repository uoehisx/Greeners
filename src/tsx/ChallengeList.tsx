import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleMap from "../components/GoogleMap";
import "../css/ChallengeList.styles.css";

interface Challenge {
  id: number;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  status: 'CL' | 'PR';  // 'CL' 또는 'PR'만 허용
  start_time: string;
  end_time: string | null;  // null을 허용
  current_participants: number;
  max_participants: number;
}


const ChallengeList = () => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [type, setType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [radius, setRadius] = useState<number | null>(null);
  const [maxParticipants, setMaxParticipants] = useState<number | null>(null);

  const fetchChallenges = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://127.0.0.1:8000/challenge/status/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            type: type || undefined,
            location: location || undefined,
            radius: radius || undefined,
            max_participants: maxParticipants || undefined,
          },
        }
      );

      if (response.status === 200) {
        setChallenges(response.data.data);
        setError(null);
      } else {
        setError("챌린지 데이터를 불러오는 데 실패했습니다.");
      }
    } catch (err: any) {
      console.error("Error fetching challenges:", err);
      setError("챌린지를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, [type, location, radius, maxParticipants]);

  return (
    <div className="challengelist-container">
      <h2 className="challengelist-title">현재 진행 중인 챌린지</h2>

      <div className="filter-container">
        <input
          type="text"
          placeholder="챌린지 유형 (예: 텀블러 사용)"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="지역 필터링"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="반경(m)"
          value={radius || ""}
          onChange={(e) => setRadius(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="최대 참여자 수"
          value={maxParticipants || ""}
          onChange={(e) => setMaxParticipants(Number(e.target.value))}
        />
        <button onClick={fetchChallenges}>검색</button>
      </div>

      <GoogleMap challenges={challenges} />

      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>{error}</p>
      ) : challenges.length > 0 ? (
        <div className="challengelist-list">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="challengelist-card"
              onClick={() => navigate(`/challengedetail/${challenge.id}`)}
            >
              <p>{challenge.name}</p>
              <p>
                현재 참여: {challenge.current_participants}/
                {challenge.max_participants}
              </p>
              <p>장소: {challenge.location.address}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>진행 중인 챌린지가 없습니다.</p>
      )}
    </div>
  );
};

export default ChallengeList;
