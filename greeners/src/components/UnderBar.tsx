import { useNavigate } from "react-router-dom";
import { FaHome, FaList, FaUser } from "react-icons/fa"; // FaHeart 제거
import styles from "../styles/UnderBar.styles"; // 스타일 파일 가져오기

const UnderBar = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.navItem} onClick={() => navigate("/")}>
        <FaHome size={24} />
        <span>홈</span>
      </div>
      <div style={styles.navItem} onClick={() => navigate("/challenge")}>
        <FaList size={24} />
        <span>챌린지</span>
      </div>
      <div style={styles.navItem} onClick={() => navigate("/MyPage")}>
        <FaUser size={24} />
        <span>MY</span>
      </div>
    </div>
  );
};

export default UnderBar;
