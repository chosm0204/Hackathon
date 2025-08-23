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
        className="pointer-events-none absolute -z-10 top-1/2 right-1 -translate-y-1/2 w-[900px] h-[1300px] object-contain opacity-95"
      />
      <div>
        <h1 className="text-3xl font-extrabold mb-10 text-center">
          안양 지하철역 중 어디로 갈까요?
        </h1>
        <div className="grid grid-cols-3 gap-6 w-[600px]">
          {stationOptions.map((station) => (
            <button
              key={station}
              onClick={() =>
                onItemToggle(`transport_${station}`)
              } /* ✅ prefix 수정 */
              className={`rounded-2xl py-3 text-lg font-semibold transition bg-white
                ${
                  selectedStation === station
                    ? "bg-[#54789B] text-white"
                    : "border-2 border-[#98ADD3] text-[#54789B] hover:bg-[#F2F6FB]"
                }`}
            >
              {station}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main6;
