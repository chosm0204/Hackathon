import React from "react";
import { useNavigate } from "react-router-dom";

const Main5 = ({ onReset, onRecommend }) => {
  // ✅ onRecommend props 추가
  const navigate = useNavigate();

  const handleReset = () => {
    if (typeof onReset === "function") onReset();
    else console.log("TODO: 선택 상태 초기화");
  };

  const handleRecommend = async () => {
    if (typeof onRecommend === "function") {
      await onRecommend(); // ✅ MainAll의 handleRecommend 실행 (API 호출)
    }
    navigate("/LoadingPage"); // 🚀 호출 끝나면 LoadingPage로 이동
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
            className="group h-14 px-8 rounded-2xl border-2 border-[#E387A1] text-[#E387A1] bg-white
                       font-semibold flex items-center gap-3 shadow-sm
                       hover:bg-pink-50 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-[#E387A1]/30"
          >
            초기화
          </button>

          {/* AI 추천받기 */}
          <button
            type="button"
            onClick={handleRecommend}
            className="h-14 px-8 rounded-2xl bg-[#E387A1] text-white font-semibold
                       shadow-md hover:brightness-95 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-[#E387A1]/40"
          >
            AI 추천받기
          </button>
        </div>
      </section>
    </div>
  );
};

export default Main5;
