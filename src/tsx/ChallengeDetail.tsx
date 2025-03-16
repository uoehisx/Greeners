import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import recycleImage from "../assets/recycle.png";

import "../css/ChallengeDetail.styles.css";

//목업 데이터
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
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    const mockChallengeData: Challenge = {
      id: "1",
      title: "분리수거 같이 해요~",
      imageUrl: recycleImage,
      timeLeft: "15분",
      participants: 7,
      maxParticipants: 10,
    };

    setChallenge(mockChallengeData);
  }, []);

  if (!challenge) {
    return <p>로딩중</p>;
  }

  return (
    <div className="challenge-detail-container">
      <h2 className="challenge-title">{challenge.title}</h2>
      <div className="challenge-image">
        {challenge.imageUrl ? (
          <img src={challenge.imageUrl} alt={challenge.title} />
        ) : (
          <div className="image-placeholder"></div>
        )}
      </div>

      <div className="challenge-info">
        <div className="info-item">
          <div className="info-circle">{challenge.timeLeft}</div>
          <p>남은 시간</p>
        </div>
        <div className="info-item">
          <div className="info-circle">{challenge.participants}명</div>
          <p>남은 인원</p>
        </div>
      </div>

      <button
        className="join-button"
        onClick={() => navigate("/challengejoin")}
      >
        참여하기
      </button>
    </div>
  );
};

export default ChallengeDetail;
