import { useState } from "react";
import "../css/ChallengeJoin.styles.css";

const ChallengeJoin = () => {
  const [image, setImage] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    alert("챌린지 참여가 완료되었습니다!");
    console.log("업로드된 이미지:", image);
    console.log("입력된 코멘트:", comment);
  };

  return (
    <div className="challenge-join-container">
      <h2 className="challenge-title">챌린지 참여하기</h2>

      <label className="image-upload">
        {image ? (
          <img src={image} alt="업로드된 이미지" className="uploaded-image" />
        ) : (
          <div className="upload-placeholder">
            <span className="plus-sign">+</span>
            <p>사진 업로드</p>
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </label>

      <textarea
        className="comment-input"
        placeholder="코멘트 입력..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button className="submit-button" onClick={handleSubmit}>
        참여완료!
      </button>
    </div>
  );
};

export default ChallengeJoin;
