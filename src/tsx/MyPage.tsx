import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/MyPage.styles.css"; // CSS 파일 import

const MyPage = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    // localStorage에서 이름 가져오기
    const storedName = localStorage.getItem("userName");
    if (storedName) setName(storedName);
  }, []);

  const handleLogout = () => {
    setPopup("logout");
    setTimeout(() => {
      setPopup("");
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
      localStorage.clear(); // 모든 사용자 데이터 삭제
      navigate("/");
    }, 1500);
  };

  return (
    <div className="mypage-container">
      <img src={logo} alt="Greeners Logo" className="logo" />
      <h2 className="title">안녕하세요!</h2>
      <h3 className="username">{name ? `${name}님` : "회원님"}</h3>

      <div className="badgeSection">
        <p>{name ? `${name}님이 획득한 배지` : "회원님이 획득한 배지"}</p>
        <div className="badgeBox"></div>
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
