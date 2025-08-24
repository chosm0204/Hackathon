import React, { useState } from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import "./App.css";

// 모든 필요한 컴포넌트들을 import 합니다.
import Header from "./yang/Header";
import Footer from "./yang/Footer";
import Login from "./yang/Login";
import Signup from "./yang/Signup";
import MainAll from "./cho/MainAll";
import LoadingPage from "./Kim/LoadingPage";
import TemAll from "./Kim/TemAll";
import Detail from "./yang/Detail";
import Course from "./Kim/Course";
import ScrollTop from "./Kim/ScrollTop";
import LoginModal from "./Kim/LoginModal";
import ParkingPin from "./Kim/ParkingPin";
import TimeLine from "./Kim/TimeLine";

const App = () => {
  const location = useLocation();
  const isDetailPage = location.pathname === '/Detail';

  // [새로 추가된 부분] 사용자가 선택한 항목을 관리하는 상태입니다.
  const [selectedItems, setSelectedItems] = useState({});

  return (
    <>
      <ScrollTop/>
      <Header />
      
      <Routes>
        <Route path="/" element={<MainAll selectedItems={selectedItems} setSelectedItems={setSelectedItems} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* [수정된 부분] selectedItems prop을 LoadingPage에 전달합니다. */}
        <Route path="/LoadingPage" element={<LoadingPage selectedItems={selectedItems} />} />
        <Route path="/temporarily" element={<TemAll />} />
        <Route path="/LoginMoadl" element={<LoginModal />} />
        <Route path="/Detail" element={<Detail />} />
        <Route path="/Course" element={<Course />} />
        {/* 필요하다면 다른 컴포넌트들도 이곳에 추가할 수 있습니다. */}
        {/* 예시: <Route path="/parking" element={<ParkingPin />} /> */}
      </Routes>
      
      {!isDetailPage && <Footer />}
    </>
  );
};

const RootApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default RootApp;
