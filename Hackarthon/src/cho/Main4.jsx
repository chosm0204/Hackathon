// src/Main4.jsx
import React from "react";

const Main4 = ({ selectedItems, onItemToggle }) => {
  const options = ["카페", "한식", "중식", "양식", "일식", "기타"];
  const isSelected = (item) => selectedItems.includes(item);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative isolate overflow-hidden">
      <img
        src="/img/Background_Brown.png"
        alt=""
        className="pointer-events-none absolute -z-10 left-0 top-1/2 -translate-y-1/2 w-[500px] h-[1300px] object-contain opacity-95"
      />
      <div className="w-full py-10 px-6 flex justify-between relative">
        <div className="flex-1 flex flex-col items-start text-left text-[#7A4C33] ml-[120px] mt-10">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-snug">
            원하는 먹거리를 선택하세요.
          </h1>
          <p className="mt-2 text-lg md:text-xl font-medium text-[#9B6C53]">
            취향에 맞게 추천해드립니다.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {options.map((label, index) => {
              // ✅ 첫 번째 선택은 대표 food, 나머지는 foods
              const value = index === 0 ? `food_${label}` : `foods_${label}`;
              const isOn = isSelected(value);
              return (
                <button
                  key={label}
                  onClick={() => onItemToggle(value)}
                  aria-pressed={isOn}
                  className={`
                    px-7 py-3 rounded-2xl text-lg font-semibold transition
                    w-48 h-16 flex items-center justify-center
                    ${
                      isOn
                        ? "bg-[#A76A46] text-white shadow-md border-2 border-transparent"
                        : "bg-white text-[#A76A46] border-2 border-[#A76A46] hover:bg-[#F7EFEA]"
                    }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
           <p className="mt-[10px]  text-gray-400">⚠️2개 이상 고르셔야 정확한 분석이 가능합니다.</p>
        </div>
          {/* 이미지 */}
          <div className="flex-1 flex justify-center items-center ml-[80px]">
            <img
              src="/img/food.png"
              alt="음식 일러스트"
              className="w-[470px] h-auto object-contain"
            />
          
           
            </div>
          
      </div>
    </div>
  );
};

export default Main4;
