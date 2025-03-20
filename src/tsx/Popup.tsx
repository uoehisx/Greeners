import React from "react";
import "../css/Popup.styles.css";

interface PopupProps {
  message: string;
  badgeImage?: string; // 획득한 뱃지 이미지 (선택 사항)
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, badgeImage, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        {badgeImage && <img src={badgeImage} alt="획득한 뱃지" className="badge-image" />}
        <button onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default Popup;
