import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
              />
            </div>

            <div>
              <p className="text-lg text-left font-bold">비밀번호</p>
              <input
                type="password"
                placeholder="비밀번호 입력(영어대소문자, 숫자, 특수문자 포함 8자~20자)"
                className="h-[50px] text-sm mt-2 px-3 py-2 w-full border border-pink-300 rounded-md shadow-sm"
              />
            </div>
          </div>
          <div className="mt-[100px] flex justify-center">
            <button
              className="m-[25px] w-[250px] h-[70px] border border-[#E387A1] rounded-2xl  text-sm font-medium t bg-white hover:bg-pink-600"
              onClick={() => navigate("/Signup")}
            >
              회원가입하기
            </button>
            <button className="m-[25px] w-[250px] h-[70px] border rounded-2xl  text-sm font-medium text-white bg-[#E387A1] hover:bg-pink-600">
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
