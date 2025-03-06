import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "../styles/Start.styles";

const Start = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <img src={logo} alt="Greeners Logo" style={styles.logo} />
      <h2 style={styles.title}>Greeners</h2>
      <button style={styles.button} onClick={() => navigate("/login")}>
        로그인
      </button>
      <button style={styles.button} onClick={() => navigate("/signup")}>
        회원가입
      </button>
    </div>
  );
};

export default Start;
