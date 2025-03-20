import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import "../css/Login.styles.css";

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
  /*const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        JSON.stringify({ id: id, password: password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { access, refresh, user } = response.data;

        // JWT 토큰 및 사용자 정보 저장
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.username);

        alert("로그인 성공!");
        navigate("/home"); // 로그인 성공 후 홈으로 이동
      }
    } catch (error) {
      alert("아이디 또는 비밀번호를 확인하세요.");
      console.error("Login Error:", error);
    }
  };
*/
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
