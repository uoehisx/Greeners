import "../css/mainSwipe.css";
import { useNavigate } from "react-router-dom";

const mainSwipe = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // 버튼 클릭 시 '/reg-challenge'로 이동
    navigate("/reg-challenge");
  };
  return (
    <div className="mainswipe-container">
      <div className="object"></div>
      <h1 className="main">오늘 000 님의 활동</h1>
      <h2 className="inProgress">진행 중인 챌린지</h2>
      <div className="items">
        <button className="swipeButton"></button>
        <button className="swipeButton"></button>
        <button className="swipeButton" onClick={handleButtonClick}></button>
      </div>
      <h2 className="participate">참여 중인 챌린지</h2>
      <div className="items">
        <button className="swipeButton"></button>
        <button className="swipeButton"></button>
        <button className="swipeButton"></button>
      </div>
    </div>
  );
};
export default mainSwipe;
