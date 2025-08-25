import React from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // useLocation 추가
import "./App.css";
import Header from "./yang/Header";
import Footer from "./yang/Footer";
import Login from "./yang/Login";
import Signup from "./yang/Signup";
import MainAll from "./cho/MainAll";
import LoadingPage from "./Kim/LoadingPage";
import Detail from "./yang/Detail";
import Course from "./Kim/Course";
import ScrollTop from "./Kim/ScrollTop";
import TemAll from "./Kim/TemAll";
import Temporarily from "./Kim/Temporarily";
import Why from "./yang/Why";

const App = () => {
  const location = useLocation(); // ✅ 현재 경로 가져오기

  return (
    <>
      <ScrollTop />
      <Header />
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={<MainAll />} />
        {/* 로그인/회원가입 */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        {/* 추천 관련 페이지 */}
        <Route path="/LoadingPage" element={<LoadingPage />} />
        <Route path="/TemAll" element={<TemAll />} />
        <Route path="/Temporarily" element={<Temporarily />} />
        {/* 상세/코스 페이지 */}
        <Route path="/Detail" element={<Detail />} />
        <Route path="/Course" element={<Course />} />
        <Route path="/Why" element={<Why />} />
      </Routes>

      {/* ✅ Detail 페이지일 때만 Footer 숨김 */}
      {location.pathname !== "/Detail" && <Footer />}
    </>
  );
};

export default App;
