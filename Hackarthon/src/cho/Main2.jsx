// src/Main2.jsx
import React from "react";

const Main2 = ({ selectedItems, onItemToggle }) => {
  const peopleOptions = ["1인", "2인", "3인", "4인 이상"];

  // 인원수마다 해시태그 2개씩 매핑
  const hashtags = {
    "1인": ["#혼놀", "#힐링"],
    "2인": ["#연인과_데이트", "#주말나들이"],
    "3인": ["#우정여행", "#맛집탐방"],
    "4인 이상": ["#효도여행", "#단체모임"],
  };

  // 현재 선택된 항목을 찾기
  const selectedOption = peopleOptions.find((option) =>
    selectedItems.includes(`people_${option}`)
  );

  return (
    <div className="px-28 mt-28 text-[#AC4562]">
      <h1 className="text-3xl font-extrabold mb-10">
        몇 명이서 하루를 보낼 계획인가요?
      </h1>
      <div className="flex justify-between items-start">
        <div className="grid grid-cols-2 gap-6 w-96 ml-9">
          {peopleOptions.map((option) => (
            <button
              key={option}
              onClick={() => onItemToggle(`people_${option}`)}
              className={`rounded-xl py-3 text-lg font-medium transition
                ${
                  selectedOption === option
                    ? "bg-[#E387A1] text-white"
                    : "border border-[#E387A1] hover:bg-pink-100"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
        {selectedOption && (
          <div className="mr-16 text-xl font-semibold flex flex-col gap-4">
            {hashtags[selectedOption].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full bg-pink-50 text-[#AC4562] border border-pink-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Main2;
