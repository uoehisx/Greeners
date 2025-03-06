import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Start from "./pages/Start";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPage from "./pages/MyPage";
import UnderBar from "./components/UnderBar";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

// 하단바를 특정 페이지에서만 렌더링하도록 설정
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
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
      {!hideUnderBar && <UnderBar />}
    </>
  );
};

export default App;
