import { useNavigate } from "react-router-dom";
import GoogleMap from "../components/GoogleMap"; // GoogleMap 컴포넌트 불러오기
import "../css/ChallengeList.styles.css"; // 챌린지 스타일 적용

const ChallengeList = () => {
  const navigate = useNavigate();

  return (
    <div className="challengelist-container">
      <h2 className="challengelist-section-title">
        내 주변에서 진행되고 있는 챌린지예요!
      </h2>
      <GoogleMap />
      <h2 className="challengelist-section-title">참여자 수 급상승 챌린지</h2>
      <div className="challengelist-list">
        <div
          className="challengelist-card"
          onClick={() => navigate("/challengedetail")}
        >
          <p>분리수거 같이 해요~</p>
          <p>15분 남음</p>
          <p>3/10</p>
        </div>
        <div className="challengelist-card">
          <p>친환경 장바구니 사용</p>
          <p>2시간 남음</p>
          <p>5/10</p>
        </div>
      </div>

      <h2 className="challengelist-section-title">최신 등록 챌린지</h2>

      <div className="challengelist-list">
        <div className="challengelist-card">
          <p>텀블러 사용하기</p>
          <p>1시간 남음</p>
          <p>4/10</p>
        </div>
        <div className="challengelist-card">
          <p>플라스틱 줄이기</p>
          <p>45분 남음</p>
          <p>2/8</p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeList;
