import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage/Login";
import HomePage from "./components/pages/HomePage/Home";
import NotFound from "./components/pages/NotFoundPage/NotFound";

// vh를 브라우저 상하단 메뉴를 제외한 화면 크기를 기반으로 설정
function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
}

// 화면 사이즈가 바뀌면 vh 다시 계산
window.addEventListener("resize", () => setScreenSize());

function App() {
  // 처음 마운트될때 vh 값을 계산
  useEffect(() => {
    setScreenSize();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
