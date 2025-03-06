import React from 'react';
import "../css/regchallenge.css";
const regchallenge=()=>{
    return(
        <div>
            <div className="title">
                <p className="name">챌린지 등록하기</p>
            </div>
            <div className="image">
                <input type="image">사진 업로드</input>
            </div>
            <div className="challengeInfo">
                <p className="time">
                    지금부터
                    <input className="timeInput" type="String" placeholder="시간 입력"/>

                </p>
                <p className="people">
                    <input className="peopleInput" type="int" placeholder="인원 입력"/>
                    모일 때까지
                </p>
                <input className="challengeTitle" type="String" placeholder="챌린지 제목 입력"/>
            </div>
            <button className="regButton">
                등록하기
            </button>
        </div>
    );
}
export default regchallenge;
