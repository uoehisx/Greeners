import React, { useState } from "react";
import "../css/mainSwipe.css";
import { useNavigate } from "react-router-dom";

const ChallengeSwipe = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState(0); // 0이면 닫힌 상태, -250이면 열린 상태
  const [startY, setStartY] = useState(0);

  // 챌린지 참여자 정보보
  const participants = [
    { id: 1, name: "1", challengeId: 101 },
    { id: 2, name: "2", challengeId: 102 },
    { id: 3, name: "3", challengeId: 103 },
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaY = e.touches[0].clientY - startY;
    if (deltaY < -50) {
      setPosition(-250); // 스와이프 위로 
    } else if (deltaY > 50) {
      setPosition(0); // 스와이프 아래로 
    }
  };

  const handleParticipantClick = (challengeId: number) => {
    navigate(`/challengedetail/${challengeId}`); 
  };

  return (
    <div
      className="mainswipe-container"
      style={{ transform: `translateY(${position}px)` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="object">
        <h3>참여자 목록</h3>
        <ul>
          {participants.map((participant) => (
            <li
              key={participant.id}
              className="participant"
              onClick={() => handleParticipantClick(participant.challengeId)}
            >
              {participant.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChallengeSwipe;
