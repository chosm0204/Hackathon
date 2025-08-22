import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Temporarily");
    }, 5000); // 5초 후 자동 이동

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative w-full h-screen bg-cover bg-center">
      {/* 배경 이미지 */}
      <img
        src="/img/map.png"
        alt="배경 지도"
        className="fixed inset-0 w-full h-full object-cover -z-10 opacity-40"
      />

      {/* 가운데 박스 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[904px] h-[453px] border-4 border-[#E387A1] flex flex-col items-center justify-center bg-white backdrop-blur-sm rounded-xl shadow-lg relative">
          {/* 왼쪽 상단 회색 동그라미 3개 */}
          <div className="absolute top-3 left-3 flex gap-3">
            <span className="w-5 h-5 rounded-full bg-gray-300"></span>
            <span className="w-5 h-5 rounded-full bg-gray-300"></span>
            <span className="w-5 h-5 rounded-full bg-gray-300"></span>
          </div>

          {/* 로딩 아이콘 */}
          <div className="mb-6">
            <div className="w-16 h-16 border-8 border-gray-300 border-t-[#E387A1] rounded-full animate-spin"></div>
          </div>

          <h1 className="text-2xl font-semibold text-center pt-4 px-4">
            잠시만 기다려주세요! <br />
            DayMaker가 하루를 계획 중이에요.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
