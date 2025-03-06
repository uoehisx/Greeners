import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "../styles/MyPage.styles";

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
    <div style={styles.container}>
      <img src={logo} alt="Greeners Logo" style={styles.logo} />
      <h2 style={styles.title}>안녕하세요!</h2>
      <h3 style={styles.username}>{name ? `${name}님` : "회원님"}</h3>

      <div style={styles.badgeSection}>
        <p>{name ? `${name}님이 획득한 배지` : "회원님이 획득한 배지"}</p>
        <div style={styles.badgeBox}></div>
      </div>

      <button style={styles.logoutButton} onClick={handleLogout}>
        로그아웃
      </button>
      <button style={styles.withdrawButton} onClick={handleWithdraw}>
        탈퇴하기
      </button>

      {popup === "confirmWithdraw" && (
        <div style={styles.popup}>
          <p>정말 탈퇴하시겠습니까?</p>
          <button style={styles.confirmButton} onClick={confirmWithdraw}>
            예
          </button>
          <button style={styles.cancelButton} onClick={() => setPopup("")}>
            아니요
          </button>
        </div>
      )}

      {popup === "withdraw" && (
        <div style={styles.popup}>
          <p>탈퇴처리가 완료되었습니다.</p>
        </div>
      )}

      {popup === "logout" && (
        <div style={styles.popup}>
          <p>로그아웃처리가 완료되었습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MyPage;
