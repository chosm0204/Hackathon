import React from "react";
import { Routes, Route } from "react-router-dom";
import Temporarily from "./Kim/Temporarily";
import "./App.css";
import Header from "./yang/Header";
// import Footer from "./yang/Footer";
import Login from "./yang/Login";
import Signup from "./yang/Signup";
import MainAll from "./cho/MainAll";
import LoadingPage from "./Kim/LoadingPAge";
import Detail from "./yang/Detail";
import Course from "./Kim/Course";
import ScrollTop from "./Kim/ScrollTop";

const App = () => {
  return (
    <>
      <ScrollTop/>
      <Header />
      <Routes>
        {/* Updated upstream 라우트 */}
        <Route path="/" element={<MainAll />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Stashed changes 라우트 */}
        <Route path="/LoadingPage" element={<LoadingPage />} />
        <Route path="/temporarily" element={<Temporarily />} />

        {/* Stashed changes 라우트 */}
        <Route path="/Detail" element={<Detail />} />
        <Route path="/Course" element={<Course />} />
      </Routes>
    </>
  );
};

export default App;
