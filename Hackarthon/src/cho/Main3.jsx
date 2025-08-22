import React from "react";

const Main3 = ({ selectedItems, onItemToggle }) => {
  const options = ["영화/공연/전시", "자연/야외", "지역 축제", "체험", "기타"];
  const isSelected = (item) => selectedItems.includes(item);

  return (
    <div className="min-h-screen w-full flex items-center justify-center ml-28">
      <div className="w-full py-10 px-6 flex justify-between relative">
        <div className="relative hidden md:flex items-center justify-start">
          <div className="flex flex-col gap-6 w-[420px]">
            <img
              src="/img/route1.png"
              alt="추천 카드 1"
              className="w-full h-auto object-contain rounded-2xl shadow-xl border border-green-100"
            />
            <img
              src="/img/route2.png"
              alt="추천 카드 2"
              className="w-full h-auto object-contain rounded-2xl shadow-xl border border-green-100 ml-12"
            />
            <img
              src="/img/route3.png"
              alt="추천 카드 3"
              className="w-full h-auto object-contain rounded-2xl shadow-xl border border-green-100 ml-24"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center text-center text-[#6E811D] ml-80 mt-10">
          <img
            src="/img/Background_Green.png"
            alt=""
            className="absolute -z-10 w-[1200px] h-[1200px] object-contain opacity-70 blur-[1px] top-1/2 -translate-y-1/2 mr-48"
          />
          <h1 className="text-3xl md:text-4xl font-extrabold leading-snug">
            문화생활은 필수죠! <br />
            즐길 거리를 골라보세요.
          </h1>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {options.map((label, index) => {
              const isOn = isSelected(label);
              const isLastItem = index === options.length - 1;
              const buttonContainerClass = isLastItem
                ? "col-span-2 flex justify-center"
                : "";
              return (
                <div key={label} className={buttonContainerClass}>
                  <button
                    onClick={() => onItemToggle(label)}
                    aria-pressed={isOn}
                    className={`
                      px-7 py-3 rounded-2xl text-lg font-semibold transition
                      w-48 h-16 flex items-center justify-center
                      ${
                        isOn
                          ? "bg-[#7A9A32] text-white shadow-md border-2 border-transparent"
                          : "bg-white text-[#7A9A32] border-2 border-[#7A9A32] hover:bg-[#EFF6E6]"
                      }`}
                  >
                    {label}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main3;
