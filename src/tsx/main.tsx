import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App"; // App 컴포넌트만 import

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App /> {/* 라우터가 이미 App.tsx에 설정되어 있으므로 그대로 렌더링 */}
  </React.StrictMode>
);
