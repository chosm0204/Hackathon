// src/Main6.jsx
import React from "react";

const Main6 = ({ selectedItems, onItemToggle }) => {
  // 안양 지하철역 7곳 (prefix: transport_)
  const stationOptions = [
    "석수역",
    "관악역",
    "안양역",
    "명학역",
    "범계역",
    "평촌역",
    "인덕원역",
  ];

  // 현재 선택된 역 찾기
  const selectedStation = stationOptions.find((station) =>
    selectedItems.includes(`transport_${station}`)
  );

  return (
    <div className="mt-28 text-[#113B60] flex justify-end pr-28 relative">
      <img
        src="/img/Background_Blue.png"
        alt=""
        className="pointer-events-none absolute -z-10 top-1/2 right-1 -translate-y-1/2 w-[800px] h-[1100px] object-contain opacity-95"
      />

      {/* flex 레이아웃 */}
      <div className="flex items-center gap-16">
        {/* 왼쪽 이미지 */}
        <div className="flex-1 flex justify-center items-center mr-[350px] ">
          <img
            src="/img/main66666.png"
            alt="역 일러스트"
            className="w-[470px] h-[350px] object-contain"
          />
        </div>

        {/* 오른쪽 버튼 영역 */}
        <div className="flex-1 flex flex-col items-center">
          <h1 className="text-3xl font-extrabold mb-10 text-center">
            하루 여정을 시작할 역을 골라주세요!
          </h1>
          <div className="grid grid-cols-3 gap-6 w-[600px]">
            {stationOptions.map((station) => (
              <button
                key={station}
                onClick={() => onItemToggle(`transport_${station}`)}
                className={`rounded-2xl py-3 text-lg font-semibold transition border-2
                  ${
                    selectedStation === station
                      ? "bg-[#54789B] border-[#54789B] text-white"
                      : "border-[#98ADD3] text-[#54789B] hover:bg-[#D6E3F3]"
                  }`}
              >
                {station}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main6;
