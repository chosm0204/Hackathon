import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  // 이메일, 비밀번호, 오류 메시지 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // 로그인 성공 메시지를 위한 상태
  const [success, setSuccess] = useState(false);

  // '로그인' 버튼 클릭 시 호출되는 함수
  const handleLogin = async () => {
    // 이전 오류 및 성공 상태 초기화
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(
        "https://daymaker.sku-sku.com/api/users/login",
        {
          email,
          password,
        }
      );

      // 로그인 성공 시 토큰을 로컬 스토리지에 저장합니다.
      const token = response.data.token;
      localStorage.setItem("token", token);

      // 성공 메시지 상태를 true로 설정합니다.
      setSuccess(true);
      
      // 1초 후 메인 페이지로 이동합니다.
      setTimeout(() => {
        navigate("/");
        // 페이지 이동 후 새로고침을 추가합니다.
        window.location.reload(); 
      }, 1000);
      
    } catch (err) {
      console.error("로그인 중 오류 발생:", err);
      // 로그인 실패 시 오류 메시지 상태를 업데이트합니다.
      setError("로그인 실패! 이메일과 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="mt-[100px] flex flex-col items-center justify-center p-8">
      <div className="w-full p-8 max-w-2xl">
        <h2 className="text-center font-bold text-3xl">로그인</h2>
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
        
        {/* 로그인 성공/실패 메시지 표시 영역 */}
        {success && (
          <p className="text-green-500 text-center mt-4 font-bold">
            로그인 성공! 잠시 후 페이지를 이동합니다.
          </p>
        )}
        {error && <p className="text-red-500 text-center mt-4 font-bold">{error}</p>}

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
  );
};

export default Login;
