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
import ChallengeList from "./tsx/ChallengeList";
import ChallengeDetail from "./tsx/ChallengeDetail.tsx";
import ChallengeJoin from "./tsx/ChallengeJoin.tsx";
import UnderBar from "./components/UnderBar";
import "./css/App.css";

const App = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("userId");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

const MainContent = () => {
  const location = useLocation();
  const hideUnderBar = ["/", "/login", "/signup"].includes(location.pathname);

  return (
    <>
      <div style={{ paddingBottom: hideUnderBar ? "0px" : "60px" }}>
        <Routes>
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
                  {hideUnderBar}
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
          <Route
            path="/challengelist"
            element={
              <RequireAuth>
                <ChallengeList />
              </RequireAuth>
            }
          />
          <Route
            path="/challengedetail/:challengeId"
            element={
              <RequireAuth>
                <ChallengeDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/challengejoin/:challengeId"
            element={
              <RequireAuth>
                <ChallengeJoin />
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
