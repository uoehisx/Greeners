import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import recycleImage from "../assets/recycle.png";
import "../css/ChallengeDetail.styles.css";

interface Challenge {
  id: string;
  title: string;
  imageUrl: string;
  timeLeft: string;
  participants: number;
  maxParticipants: number;
}

const ChallengeDetail = () => {
  const navigate = useNavigate();
  const { challengeId } = useParams<{ challengeId: string }>(); // URL에서 challengeId 가져오기
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    const mockChallengeData: Record<string, Challenge> = {
      "1": {
        id: "1",
        title: "분리수거 같이 해요~",
        imageUrl: recycleImage,
        timeLeft: "15분",
        participants: 7,
        maxParticipants: 10,
      },
      "2": {
        id: "2",
        title: "텀블러 사용하기",
        imageUrl: recycleImage,
        timeLeft: "30분",
        participants: 5,
        maxParticipants: 10,
      },
    };

    if (challengeId && mockChallengeData[challengeId]) {
      setChallenge(mockChallengeData[challengeId]);
    }
  }, [challengeId]);

  if (!challenge) {
    return <p>로딩중...</p>;
  }

  return (
    <div className="challenge-detail-container">
      <h2 className="challenge-title">{challenge.title}</h2>
      <div className="challenge-image">
        <img src={challenge.imageUrl} alt={challenge.title} />
      </div>

      <div className="challenge-info">
        <div className="info-item">
          <div className="info-circle">{challenge.timeLeft}</div>
          <p>남은 시간</p>
        </div>
        <div className="info-item">
          <div className="info-circle">{challenge.participants}명</div>
          <p>참여 인원</p>
        </div>
      </div>

      <button
        className="join-button"
        onClick={() => navigate(`/challengejoin/${challenge.id}`)}
      >
        참여하기
      </button>
    </div>
  );
};

export default ChallengeDetail;
