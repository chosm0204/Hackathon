// src/TemAll.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Temporarily from "./Temporarily";
import Departure from "./Departure";

const TemAll = () => {
  const location = useLocation();
  const result = location.state?.result; // MainAll에서 전달받은 결과

  // ✅ 출발역 추출
  const stationName = result?.selectedStation || "출발지";

  return (
    <div className="mt-36">
      {/* 배경 이미지  */}
      <img
        src="/img/map.png"
        alt="배경 지도"
        className="fixed inset-0 w-full h-full object-cover -z-10 opacity-40"
      />
      <div className="fixed inset-0 bg-white/30 backdrop-blur-[5px] -z-10" />

      {/* 출발지 */}
      <Departure stationName={stationName} />

      {/* 추천 코스들 */}
      <Temporarily courses={result?.courses || []} />
    </div>
  );
};

export default TemAll;
