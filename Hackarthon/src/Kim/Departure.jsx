import React from "react";

const Departure = ({ stationName }) => {
  return (
    <div className="flex flex-col items-center my-2 relative">
      {/* 제목 */}
      <h1 className="mb-6 text-center text-2xl font-bold z-10 relative px-4 ml-[68px] ">
        안양토박이가 추천하는
        <br />
        연인을 위한 안양 맛집 데이트
      </h1>

      {/* 출발지 */}
      <div className="flex items-center mt-12 relative z-10">
        <div className="flex text-lg font-medium mr-4 bg-white border-[1.5px] border-gray-700 w-[500px] h-[50px] ml-[68px] justify-center items-center rounded-2xl">
          {stationName}
        </div>
      </div>

      {/* 화살표 */}
      <div className="mt-12 text-2xl text-gray-500 z-10 relative ml-[68px] ">
        ↓
      </div>
    </div>
  );
};

export default Departure;
