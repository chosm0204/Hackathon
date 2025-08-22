import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://43.203.141.38:8080/api/users/login", {
        email,
        password,
      });

      // 로그인 성공 시 토큰 저장
      const token = response.data.token;
      localStorage.setItem("token", token);

      alert("로그인 성공!");
      navigate("/Temporarily"); // 메인 페이지 등 원하는 경로로 이동
    } catch (err) {
      console.error(err);
      setError("로그인 실패! 이메일과 비밀번호를 확인하세요.");
    }
  };

  return (
    <div>
      <div className="mt-[100px] flex items-center justify-center p-8">
        <div className="w-full p-8 max-w-2xl">
          <h2 className="text-center font-bold text-3xl ">로그인</h2>
          <p className="mt-[7px] text-center text-xl">
            DayMaker에 로그인하여 더 많은 기능을 이용해보세요!
          </p>

          <div className="space-y-6 mt-[70px]">
            <div>
              <p className="text-lg text-left font-bold">이메일</p>
              <input
                type="email"
                placeholder="ex) daymaker@naver.com"
                className="h-[50px] text-sm mt-2 px-3 py-2 w-full border border-pink-300 rounded-md shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <p className="text-lg text-left font-bold">비밀번호</p>
              <input
                type="password"
                placeholder="비밀번호 입력(영어대소문자, 숫자, 특수문자 포함 8자~20자)"
                className="h-[50px] text-sm mt-2 px-3 py-2 w-full border border-pink-300 rounded-md shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <div className="mt-[100px] flex justify-center">
            <button
              className="m-[25px] w-[250px] h-[70px] border border-[#E387A1] rounded-2xl text-sm font-medium bg-white hover:bg-pink-600"
              onClick={() => navigate("/Signup")}
            >
              회원가입하기
            </button>
            <button
              className="m-[25px] w-[250px] h-[70px] border rounded-2xl text-sm font-medium text-white bg-[#E387A1] hover:bg-pink-600"
              onClick={handleLogin}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
