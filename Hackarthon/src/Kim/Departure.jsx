import React from "react";

const Departure = ({ stationName }) => {
  return (
    <div className="flex flex-col items-center my-2 relative">
      {/* 제목 */}
      <h1 className="mb-6 text-center text-2xl font-bold z-10 relative px-4 ml-[68px] ">
        DayMaker가 추천하는 
        <br/>
         오늘 하루 안양에서 경험하는 소확행 코스
      </h1>

      {/* 출발지 */}
      <div className="flex items-center mt-12 relative z-10">
        <div className="flex text-lg font-medium mr-4 bg-white border-[1.5px] border-gray-500 w-[500px] h-[60px] ml-[68px] justify-between pl-[13px] items-center rounded-2xl">
          {/* 출발지 텍스트 - 왼쪽 */}
          <span className="font-medium text-lg">출발지:</span>

          {/* 역 이름 - 가운데 */}
          <span className="flex-grow text-center font-medium text-lg pr-[55px]">
            {stationName}
          </span>
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
