import React from "react";

const Main5 = ({ onReset, onRecommend }) => {
  const handleReset = () => {
    if (typeof onReset === "function") onReset();
    else console.log("TODO: 선택 상태 초기화");
  };

  const handleRecommend = () => {
    if (typeof onRecommend === "function") onRecommend();
    else console.log("TODO: AI 추천 화면으로 이동");
  };

  return (
    <div className="min-h-[50vh] w-full flex items-center justify-center">
      <section className="w-full max-w-5xl mx-auto px-6 text-center">
        {/* 타이틀 */}
        <h2 className="text-[#AC4562] font-extrabold leading-tight text-[clamp(22px,3.2vw,32px)]">
          선택이 끝났다면,
          <br />
          이젠 <span className="text-[#E387A1]">DayMaker</span>에게 맡길 시간!
        </h2>

        {/* 버튼들 */}
        <div className="mt-8 flex items-center justify-center gap-6">
          {/* 초기화 (아웃라인) */}
          <button
            type="button"
            onClick={handleReset}
            aria-label="선택 초기화"
            className="group h-14 px-8 rounded-2xl border-2 border-[#E387A1] text-[#E387A1] bg-white
                       font-semibold flex items-center gap-3 shadow-sm
                       hover:bg-pink-50 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-[#E387A1]/30"
          >
            {/* 아이콘: Heroicons Arrow Path 유사 */}
            <svg
              className="w-5 h-5 stroke-current"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4.5 12a7.5 7.5 0 0113.5-5.3M18 6.7V3m0 3.7h-3.75" />
              <path d="M19.5 12a7.5 7.5 0 01-13.5 5.3M6 17.3V21m0-3.7H9.75" />
            </svg>
            초기화
          </button>

          {/* AI 추천받기 (필) */}
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
