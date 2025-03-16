import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Start from "./tsx/Start";
import Login from "./tsx/Login";
import Signup from "./tsx/Signup";
import MyPage from "./tsx/MyPage";
import CalendarComponent from "./tsx/CalendarComponent.tsx";
import RegChallenge from "./tsx/regchallenge.tsx";
import UnderBar from "./components/UnderBar";
import "./css/App.css";

const App = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

// 로그인 여부 확인 후 보호된 페이지로 이동하는 컴포넌트
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("userId"); // 로그인 상태 확인

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // 로그인 안 하면 로그인 페이지로 이동
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null; // 로그인 상태일 때만 컴포넌트 렌더링
};

// 하단바를 특정 페이지에서만 렌더링하도록 설정
const MainContent = () => {
  const location = useLocation();
  const hideUnderBar = ["/", "/login", "/signup"].includes(location.pathname);

  return (
    <>
      <div style={{ paddingBottom: hideUnderBar ? "0px" : "60px" }}>
        <Routes>
          {/* 첫 화면: Start.tsx */}
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 로그인 후 접근 가능한 페이지 */}
          <Route
            path="/home"
            element={
              <RequireAuth>
                <div>
                  <h1 className="title">
                    안녕하세요! {localStorage.getItem("userName") || "회원"}님!
                  </h1>
                  <CalendarComponent />
                </div>
              </RequireAuth>
            }
          />
          <Route
            path="/mypage"
            element={
              <RequireAuth>
                <MyPage />
              </RequireAuth>
            }
          />
          <Route
            path="/regchallenge"
            element={
              <RequireAuth>
                <RegChallenge />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
      {!hideUnderBar && <UnderBar />}
    </>
  );
};

export default App;
