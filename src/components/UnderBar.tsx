import { useNavigate } from "react-router-dom";
import { FaHome, FaList, FaUser } from "react-icons/fa"; // FaHeart 추가
import "../css/UnderBar.styles.css"; // CSS 파일 가져오기

const UnderBar = () => {
  const navigate = useNavigate();

  return (
    <div className="underbar-container">
      <div className="underbar-item" onClick={() => navigate("/home")}>
        <FaHome />
        <span>홈</span>
      </div>
      <div className="underbar-item" onClick={() => navigate("/regchallenge")}>
        <FaList />
        <span>챌린지</span>
      </div>
      <div className="underbar-item" onClick={() => navigate("/mypage")}>
        <FaUser />
        <span>MY</span>
      </div>
    </div>
  );
};

export default UnderBar;
