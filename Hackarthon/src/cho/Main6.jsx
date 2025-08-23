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
    <div className="mt-28 text-[#6E811D] flex justify-end pr-28">
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
              className={`rounded-xl py-3 text-lg font-medium transition
                ${
                  selectedStation === station
                    ? "bg-[#7A9A32] text-white"
                    : "border border-[#7A9A32] text-[#7A9A32] hover:bg-green-100"
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
