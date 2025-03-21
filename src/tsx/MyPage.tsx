import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import "../css/MyPage.styles.css";

const MyPage = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState("");
  const [name, setName] = useState("");
  const [badges, setBadges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [badgeType, setBadgeType] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setName(storedName);

    fetchBadges();
  }, [currentPage, badgeType]);

  const fetchBadges = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(`http://127.0.0.1:8000/badges/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage, size: 10, badgeType },
      });

      setBadges(response.data.badges);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("배지 불러오기 실패:", error);
    }
  };

  const handleBadgeTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBadgeType(event.target.value);
    setCurrentPage(1);
  };

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

  return (
    <div className="mypage-container">
      <img src={logo} alt="Greeners Logo" className="logo" />
      <h2 className="title">안녕하세요!</h2>
      <h3 className="username">{name ? `${name}님` : "회원님"}</h3>

      <div className="badge-filter">
        <label htmlFor="badgeType">배지 유형:</label>
        <select
          id="badgeType"
          value={badgeType}
          onChange={handleBadgeTypeChange}
        >
          <option value="">전체</option>
          <option value="1">텀블러 사용</option>
          <option value="2">메일 삭제</option>
          <option value="3">플라스틱 줄이기</option>
        </select>
      </div>

      <div className="badgeSection">
        <p>{name ? `${name}님이 참여한 챌린지` : "회원님이 참여한 챌린지"}</p>
        <div className="badgeBox"></div>
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ◀ 이전
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          다음 ▶
        </button>
      </div>

      <button className="logoutButton" onClick={handleLogout}>
        로그아웃
      </button>
      <button className="withdrawButton" onClick={handleWithdraw}>
        탈퇴하기
      </button>

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
