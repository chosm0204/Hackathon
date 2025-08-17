import React from "react";

const Signup = () => {
  return (
    <div>
      <div className="mt-[100px] flex items-center justify-center p-8">
        <div className="w-full p-8 max-w-2xl">
          <h2 className="text-center font-bold text-3xl ">회원가입</h2>
          <p className="mt-[7px] text-center text-xl">
            DayMaker 회원이 되어 추천 경로를 확정하세요!
          </p>

          <div className="space-y-6 mt-[70px]">
            <div>
              <p className="text-lg text-left font-bold">닉네임</p>
              <input
                type="name"
                placeholder="닉네임 입력(3자~10자)"
                className="h-[50px] text-sm mt-2 px-3 py-2 w-full border border-pink-300 rounded-md shadow-sm"
              />
            </div>

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

            <div>
              <p className="text-lg text-left font-bold">비밀번호 확인</p>
              <input
                type="password"
                placeholder="비밀번호 재입력"
                className="h-[50px] text-sm mt-2 px-3 py-2 w-full border border-pink-300 rounded-md shadow-sm"
              />
            </div>
          </div>
          <div className="mt-[100px] flex justify-center">
            <button className="m-[25px] w-[250px] h-[70px] border border-[#E387A1] rounded-2xl  text-sm font-medium  bg-white hover:bg-pink-600">
              돌아가기
            </button>
            <button className="m-[25px] w-[250px] h-[70px] border rounded-2xl  text-sm font-medium text-white bg-[#E387A1] hover:bg-pink-600">
              회원가입 완료하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
