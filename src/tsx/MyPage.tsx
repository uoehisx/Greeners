import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import "../css/MyPage.styles.css";

interface Challenge {
  id: number;
  name: string;
  status: string;
}

const mockChallenges: Challenge[] = [
  { id: 1, name: "분리수거", status: "성공" },
  { id: 2, name: "텀블러 사용", status: "실패" },
  { id: 3, name: "메일 삭제", status: "진행중" },
  { id: 4, name: "걷기 챌린지", status: "성공" },
  { id: 5, name: "플라스틱 줄이기", status: "진행중" },
];

const MyPage = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState("");
  const [name, setName] = useState("000");
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [filter, setFilter] = useState("전체");

  const handleLogout = () => {
    setPopup("logout");
    setTimeout(() => {
      setPopup("");
      localStorage.clear();
      navigate("/");
    }, 1500);
  };

  const handleWithdraw = () => {
    setPopup("confirmWithdraw");
  };

  const confirmWithdraw = () => {
    setPopup("withdraw");
    setTimeout(() => {
      setPopup("");
      localStorage.clear();
      navigate("/");
    }, 1500);
  };

  const filteredChallenges = challenges.filter((challenge) => {
    if (filter === "전체") return true;
    return challenge.status === filter;
  });

  return (
    <div className="mypage-container">
      <img src={logo} alt="Greeners Logo" className="logo" />
      <h2 className="logo-title">Greeners</h2>
      <p className="subtitle">회원님이 참여한 챌린지</p>

      <div className="filter-buttons">
        {["전체", "진행중", "성공", "실패"].map((status) => (
          <button
            key={status}
            className={`filter-button ${filter === status ? "active" : ""}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <table className="challenge-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>챌린지 이름</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {filteredChallenges.map((challenge, index) => (
            <tr key={challenge.id}>
              <td>{index + 1}</td>
              <td>{challenge.name}</td>
              <td className={`status ${challenge.status}`}>
                {challenge.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 로그아웃 및 탈퇴 버튼 */}
      <button className="logoutButton" onClick={handleLogout}>
        로그아웃
      </button>
      <button className="withdrawButton" onClick={handleWithdraw}>
        탈퇴하기
      </button>

      {/* 팝업 메시지 */}
      {popup === "confirmWithdraw" && (
        <div className="popup">
          <p>정말 탈퇴하시겠습니까?</p>
          <button className="confirmButton" onClick={confirmWithdraw}>
            예
          </button>
          <button className="cancelButton" onClick={() => setPopup("")}>
            아니요
          </button>
        </div>
      )}
      {popup === "withdraw" && (
        <div className="popup">
          <p>탈퇴처리가 완료되었습니다.</p>
        </div>
      )}
      {popup === "logout" && (
        <div className="popup">
          <p>로그아웃처리가 완료되었습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MyPage;
