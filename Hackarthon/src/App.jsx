// App.jsx
import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom"; // ✅ BrowserRouter 제거
import Header from "./yang/Header";
import Footer from "./yang/Footer";
import Login from "./yang/Login";
import Fake from "./yang/Fake";
import Signup from "./yang/Signup";
import Main from "./cho/Main";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/fake" element={<Fake />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
