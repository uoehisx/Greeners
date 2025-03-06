import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "../styles/Login.styles";

const mockUsers = [
  { id: "test", password: "1234" }, // 샘플 사용자 데이터
];

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = mockUsers.find(
      (user) => user.id === id && user.password === password
    );

    if (user) {
      console.log("로그인 성공");
      navigate("/mypage"); // 로그인 성공 시 마이페이지 이동
    } else {
      alert("회원 정보가 일치하지 않습니다."); // 팝업 띄우기
    }
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="Greeners Logo" style={styles.logo} />
      <h2 style={styles.title}>Greeners</h2>

      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <button style={styles.button} onClick={handleLogin}>
        로그인
      </button>
    </div>
  );
};

export default Login;
