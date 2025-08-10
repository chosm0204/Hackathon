// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Testpage from "./Kim/Testpage";
import Temporarily from "./Kim/Temporarily";
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
        {/* Updated upstream 라우트 */}
        <Route path="/" element={<Main />} />
        <Route path="/" element={<Fake />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Stashed changes 라우트 */}
        <Route path="/testpage" element={<Testpage />} />
        <Route path="/temporarily" element={<Temporarily />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
