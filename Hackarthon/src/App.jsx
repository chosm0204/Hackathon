// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Testpage from "./Kim/Testpage";
import Temporarily from "./Kim/Temporarily";
import "./App.css";
import Header from "./yang/Header";
import Footer from "./yang/Footer";
import Login from "./yang/Login";
import Signup from "./yang/Signup";
import Main from "./cho/Main";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={<Main />} />

        {/* 기존 페이지들 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 추가 페이지들 */}
        <Route path="/testpage" element={<Testpage />} />
        <Route path="/temporarily" element={<Temporarily />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
