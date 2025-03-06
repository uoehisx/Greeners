import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "../styles/Signup.styles";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    if (!name || !id || !password) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 사용자 정보 저장 (localStorage 사용)
    localStorage.setItem("userName", name);
    localStorage.setItem("userId", id);
    localStorage.setItem("userPassword", password);

    alert("회원가입이 완료되었습니다!");
    navigate("/login"); // 회원가입 후 로그인 페이지로 이동
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="Greeners Logo" style={styles.logo} />
      <h2 style={styles.title}>Greeners</h2>
      <p style={styles.subtitle}>뜻깊은 기후행동에 함께 해주어 감사해요!</p>

      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
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
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={styles.input}
      />

      <button style={styles.button} onClick={handleSignup}>
        회원가입 완료
      </button>
    </div>
  );
};

export default Signup;
