import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChallengeSwipe from "./challeneSwipe.tsx";
import Popup from "./Popup.tsx";
import recycleImage from "../assets/recycle.png";
import badgeImage from "../assets/badge.png"; // 획득한 뱃지 이미지 추가
import "../css/ChallengeDetail.styles.css";

interface Challenge {
  id: string;
  title: string;
  imageUrl: string;
  start_time: string;
  end_time: string;
  participants: number;
  maxParticipants: number;
}

const MyChallengeDetail = () => {
  const { challengeId } = useParams<{ challengeId: string }>(); 
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [popupInfo, setPopupInfo] = useState<{ message: string; badgeImage?: string } | null>(null);

  useEffect(() => {
    const mockChallengeData: Record<string, Challenge> = {
      "1": {
        id: "1",
        title: "분리수거 같이 해요~",
        imageUrl: recycleImage,
        start_time: "2025-01-28T10:00:00Z",
        end_time: "2025-02-15T18:00:00Z",
        participants: 10,
        maxParticipants: 10,
      },
      "2": {
        id: "2",
        title: "텀블러 사용하기",
        imageUrl: recycleImage,
        start_time: "2025-02-10T09:00:00Z",
        end_time: "2025-03-01T23:59:59Z",
        participants: 5,
        maxParticipants: 10,
      },
    };

    if (challengeId && mockChallengeData[challengeId]) {
      setChallenge(mockChallengeData[challengeId]);
    }
  }, [challengeId]);

  useEffect(() => {
    if (challenge) {
      const currentTime = new Date().toISOString();
      if (currentTime > challenge.end_time) {
        if (challenge.participants === challenge.maxParticipants) {
          setPopupInfo({ message: "챌린지 성공! 뱃지를 획득했습니다!", badgeImage });
        } else {
          setPopupInfo({ message: " 챌린지 실패! 다음 챌린지를 등록해보세요." });
        }
      }
    }
  }, [challenge]);

  if (!challenge) return <p>로딩중...</p>;

  return (
    <div className="challenge-detail-container">
      <h2>{challenge.title}</h2>
      <img src={challenge.imageUrl} alt={challenge.title} />
      <ChallengeSwipe />
      {popupInfo && <Popup message={popupInfo.message} badgeImage={popupInfo.badgeImage} onClose={() => setPopupInfo(null)} />}
    </div>
  );
};

export default MyChallengeDetail;
