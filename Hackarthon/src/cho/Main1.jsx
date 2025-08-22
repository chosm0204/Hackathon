import React from "react";

const Main1 = () => {
  return (
    <div className="relative">
      <img
        src="/img/Background_Pink.png"
        alt="핑크배경"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <section className="h-screen snap-start flex flex-col items-center justify-start pt-48 text-[#611128] relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center">
          "오늘 하루, 안양에서 뭐할까?"
        </h1>
        <p className="mt-20 text-4xl font-semibold text-center">
          먹을거리부터 즐길거리까지,
        </p>
        <p className="mt-5 text-4xl font-semibold text-center">
          DayMaker가 추천하는 하루를 경험해보세요!
        </p>
        <div className="flex items-center justify-center h-screen">
          <img
            src="/img/iMac.png"
            alt="목업"
            className="w-[700px] h-auto object-contain"
          />
        </div>
      </section>
    </div>
  );
};

export default Main1;
