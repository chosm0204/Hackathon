import React from "react";
import "./App.css";
import Header from "./yang/Header";
import Footer from "./yang/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./yang/Login";
import Fake from "./yang/Fake";
import Signup from "./yang/Signup";
import Main from "./cho/Main";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Fake />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
