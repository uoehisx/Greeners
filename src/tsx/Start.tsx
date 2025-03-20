import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/Start.styles.css"; // CSS 파일 import

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className="start-container">
      <img src={logo} alt="Greeners Logo" className="logo" />
      <h2 className="title">Greeners</h2>
      <button className="button" onClick={() => navigate("/login")}>
        로그인
      </button>
      <button className="button" onClick={() => navigate("/signup")}>
        회원가입
      </button>
    </div>
  );
};

export default Start;
