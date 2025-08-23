import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ BrowserRouter 제거
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
import LoginModal from "./Kim/LoginModal";
import TemAll from "./Kim/TemAll";

const App = () => {
  return (
    <>
      {" "}
      {/* ✅ BrowserRouter 제거 (index.js에서 이미 래핑됨) */}
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
        <Route path="/TemAll" element={<TemAll />} />{" "}
        {/* ✅ MainAll에서 navigate하는 경로와 일치 */}
        <Route path="/Temporarily" element={<TemAll />} />{" "}
        {/* ✅ 기존 경로도 유지 (호환성) */}
        {/* 상세/코스 페이지 */}
        <Route path="/Detail" element={<Detail />} />
        <Route path="/Course" element={<Course />} />
        {/* 모달 (일반적으로 라우트로 설정하지 않음) */}
        <Route path="/LoginModal" element={<LoginModal />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
