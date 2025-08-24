import React from "react";
import { useNavigate } from "react-router-dom";

const Main5 = ({ onReset, onRecommend, isLoading }) => {
  const navigate = useNavigate();

  const handleReset = () => {
    if (typeof onReset === "function") onReset();
    else console.log("TODO: 선택 상태 초기화");
  };

  const handleRecommend = async () => {
    if (typeof onRecommend === "function") {
      navigate("/LoadingPage"); // ✅ 로딩 페이지로 먼저 이동
      await onRecommend();  // API 호출 등은 MainAll에서 처리
    }
  };

  return (
    <div className="min-h-[50vh] w-full flex items-center justify-center">
      <section className="w-full max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-[#AC4562] font-extrabold leading-tight text-[clamp(22px,3.2vw,32px)]">
          선택이 끝났다면,
          <br />
          이젠 <span className="text-[#E387A1]">DayMaker</span>에게 맡길 시간!
        </h2>

        <div className="mt-8 flex items-center justify-center gap-6">
          {/* 초기화 */}
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="group h-14 px-8 rounded-2xl border-2 border-[#E387A1] text-[#E387A1] bg-white
                       font-semibold flex items-center gap-3 shadow-sm
                       hover:bg-pink-50 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-[#E387A1]/30
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            초기화
          </button>

          {/* AI 추천받기 */}
          <button
            type="button"
            onClick={handleRecommend}
            disabled={isLoading}
            className="h-14 px-8 rounded-2xl bg-[#E387A1] text-white font-semibold
                       shadow-md hover:brightness-95 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-[#E387A1]/40
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                추천 중...
              </>
            ) : (
              "AI 추천받기"
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Main5;
