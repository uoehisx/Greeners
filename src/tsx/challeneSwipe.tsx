import React from 'react';
import "../css/mainSwipe.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const challengeSwipe = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState(0); // 0이면 닫힌 상태, -250이면 열린 상태
  const [startY, setStartY] = useState(0);

  const handleButtonClick = () => {
    navigate("/reg-challenge");
  };

  const handleButtonClick_=()=>{
    navigate("/challengedetail/:challengeId");
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaY = e.touches[0].clientY - startY;
    if (deltaY < -50) {
      setPosition(-250); // 스와이프 위로 → 열림
    } else if (deltaY > 50) {
      setPosition(0); // 스와이프 아래로 → 닫힘
    }
  };

  return (
    <div
      className="mainswipe-container"
      style={{ transform: `translateY(${position}px)` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="object"></div>
      <h1 className="main">오늘 {localStorage.getItem("userName") || "회원"}님의 활동</h1>
      <h2 className="inProgress">진행 중인 챌린지</h2>
      <div className="items">
        <button className="swipeButton"></button>
        <button className="swipeButton"></button>
        <button className="swipeButton" onClick={handleButtonClick}></button>
      </div>
      <h2 className="participate">참여 중인 챌린지</h2>
      <div className="items">
        <button className="swipeButton"></button>
        <button className="swipeButton"></button>
        <button className="swipeButton" onClick={handleButtonClick_}></button>
      </div>
    </div>
  );
};

export default challengeSwipe;