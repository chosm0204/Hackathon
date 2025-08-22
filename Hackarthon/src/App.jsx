import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./yang/Header";
import Footer from "./yang/Footer";
import Login from "./yang/Login";
import Signup from "./yang/Signup";
import MainAll from "./cho/MainAll";
import LoadingPage from "./Kim/LoadingPage";
import Temporarily from "./Kim/Temporarily";
import Detail from "./yang/Detail";
import Course from "./Kim/Course";
import ScrollTop from "./Kim/ScrollTop";
import LoginModal from "./Kim/LoginModal";
import ParkingPin from "./Kim/ParkingPin";
import TimeLine from "./Kim/TimeLine";
import TemAll from "./Kim/TemAll";

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
        <Route path="/temporarily" element={<TemAll />} />
        <Route path="/LoginMoadl" element={<LoginModal />} />

        {/* Stashed changes 라우트 */}
        <Route path="/Detail" element={<Detail />} />
        <Route path="/Course" element={<Course />} />
        

      </Routes>
      <Footer />
    </>
  );
};

export default App;
