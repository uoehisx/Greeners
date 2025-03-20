import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import "../css/Signup.styles.css";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !id || !password) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        id: id,
        username: name, // 이메일이 필수라면 임시 이메일 사용
        password: password,
      });

      if (response.status === 201) {
        alert("회원가입이 완료되었습니다!");
        navigate("/login"); // 회원가입 후 로그인 페이지로 이동
      }
    } catch (error) {
      alert("회원가입 실패: 이미 존재하는 아이디거나 서버 오류입니다.");
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="signup-container">
      <img src={logo} alt="Greeners Logo" className="logo" />
      <h2 className="title">Greeners</h2>
      <p className="subtitle">뜻깊은 기후행동에 함께 해주어 감사해요!</p>

      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
      />
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
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input"
      />

      <button className="button" onClick={handleSignup}>
        회원가입
      </button>
    </div>
  );
};

export default Signup;
