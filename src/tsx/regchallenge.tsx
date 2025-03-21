import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup.tsx";
import "../css/regchallenge.css";

const RegChallenge = () => { 
    const navigate = useNavigate();
    const [challengeData, setChallengeData] = useState({
      title: "",
      start_time: "",
      end_time: "",
      max_participants: 10,
    });
  const [popupMessage, setPopupMessage] = useState<string | null>(null); // 팝업 메시지 상태
  const [isSuccess, setIsSuccess] = useState<boolean>(false); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChallengeData({
      ...challengeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {/*백엔드 요청식 적어주세요*/      const response = await fetch("https://api.example.com/challenges ", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(challengeData),
      });

      if (response.ok) {
        setPopupMessage("챌린지가 등록되었습니다!");
        setIsSuccess(true);
      } else {
        throw new Error("등록 실패");
      }
    } catch (error) {
      setPopupMessage("등록에 실패했습니다. 다시 시도해주세요.");
      setIsSuccess(false);
    }
  };
  return (
    <div className="container">
      <p className="title">챌린지 등록하기</p>

      <div className="image-container">
        <div className="image-upload">+ 사진 업로드</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="challenge-info">
          <div className="time-section">
            <span className="bold-text">지금부터</span>
            <input
              className="input-box"
              type="datetime-local"
              name="start_time"
              value={challengeData.start_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="people-section">
            <input
              className="input-box"
              type="number"
              name="max_participants"
              value={challengeData.max_participants}
              onChange={handleChange}
              min="1"
              required
            />
            <span className="bold-text"> 모일 때까지!</span>
          </div>

          <input
            className="title-input"
            type="text"
            name="title"
            placeholder="챌린지 제목 입력"
            value={challengeData.title}
            onChange={handleChange}
            required
          />
        </div>

        <button className="register-button" type="submit">등록하기</button>
      </form> 
      {popupMessage && ( 
        <Popup
          message={popupMessage}
          onClose={() => setPopupMessage(null)}
        />
      )}
    </div>
  );
};

export default RegChallenge;
