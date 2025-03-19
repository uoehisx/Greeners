import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/Login.styles.css"; // CSS 파일 import

const mockUsers = [
  { id: "test", password: "1234", name: "홍길동" }, // 샘플 사용자 데이터
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
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.name);
      navigate("/home"); // 로그인 성공 후 홈으로 이동
    } else {
      alert("회원 정보가 일치하지 않습니다.");
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Greeners Logo" className="logo" />
      <h2 className="title">Greeners</h2>

      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />

      <button className="button" onClick={handleLogin}>
        로그인
      </button>
    </div>
  );
};

export default Login;
