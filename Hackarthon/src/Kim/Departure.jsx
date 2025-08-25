import React from "react";
import { useLocation } from "react-router-dom";
import Temporarily from "./Temporarily";
import Departure from "./Departure";
import { convertCoordsToPixels } from "../cho/mapUtils";

const TemAll = () => {
  const location = useLocation();

  // 디버깅: 받은 데이터 확인
  console.log("🔍 TemAll - location.state:", location.state);

  const apiResult = location.state?.result;
  const selectedStation = location.state?.selectedStation || "출발지";
  const directCourses = location.state?.courses; // MainAll에서 직접 처리한 코스 데이터

  console.log("🔍 TemAll - apiResult:", apiResult);
  console.log("🔍 TemAll - selectedStation:", selectedStation);
  console.log("🔍 TemAll - directCourses:", directCourses);

  // MainAll에서 직접 처리한 코스 데이터가 있으면 그것을 우선 사용
  let courses = directCourses;

  // 없으면 기존 방식으로 처리 시도
  if (!courses) {
    courses =
      apiResult?.optimizedRoute?.map((item, index) => ({
        id: index + 1,
        title: item.name,
        category: item.category || "카테고리",
        description: item.description || "설명 없음",
        address: item.address,
        rating: item.rating,
        latitude: item.latitude,
        longitude: item.longitude,
      })) || [];
  }

  const parkingData = apiResult?.parkingSpaces || [];

  console.log("🔍 TemAll - courses:", courses);
  console.log("🔍 TemAll - parkingData:", parkingData);

  // 데이터가 없을 때 대체 UI 표시
  if (!apiResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            데이터를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600">
            API 응답 데이터가 전달되지 않았습니다.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 px-4 py-2 bg-[#E387A1] text-white rounded"
          >
            메인으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 출발지 아이콘 경로를 조건부로 설정
  const departureIconSrc = selectedStation === "명학역" ? "/img/명학역.png" : "";

  return (
    <div className="mt-36">
      <img
        src="/img/map.png"
        alt="배경 지도"
        className="fixed inset-0 w-full h-full object-cover -z-10 opacity-40"
      />
      <div className="fixed inset-0 bg-white/30 backdrop-blur-[5px] -z-10" />

      {/* ✅ 출발지 아이콘을 위한 이미지 태그 */}
      {/* 명학역인 경우에만 이미지를 표시합니다. */}
      {selectedStation === "명학역" && (
        <img src={departureIconSrc} alt="명학역 아이콘" className="w-10 h-10" />
      )}

      {/* ✅ Departure 컴포넌트 */}
      <Departure stationName={selectedStation} />

      {/* ✅ Temporarily 컴포넌트 */}
      <Temporarily courses={courses} parkingData={parkingData} />
    </div>
  );
};

export default TemAll;
