import React from 'react';
import CalendarComponent from './CalendarComponent';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import RegChallenge from '../tsx/regchallenge.tsx'; // RegChallenge 컴포넌트 import
import "../css/App.css";
const App = () => {
  return (
    <Router> {/* Router는 App 컴포넌트 내부에 위치해야 합니다 */}
      <Routes>
        <Route path="/" element={<div><h1 className="title">안녕하세요! ______님!</h1><CalendarComponent /></div>} />
        <Route path="/regchallenge" element={<RegChallenge />} /> {/* /reg-challenge 경로 설정 */}
      </Routes>
    </Router>
  );
};

export default App;


