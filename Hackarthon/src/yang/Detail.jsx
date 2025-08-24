import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ParkingPin from "../Kim/ParkingPin";
import TimeLine from "../Kim/TimeLine";
import KakaoMap from "../cho/KakaoMap";

const Detail = () => {
  const location = useLocation();
  
  // 데이터 로딩 로직 개선
  const [confirmedCourses, setConfirmedCourses] = useState([]);
  const [parkingData, setParkingData] = useState([]);
  
  const [activePlaceId, setActivePlaceId] = useState(null);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [showParking, setShowParking] = useState(false);
  const [recommendedRoute, setRecommendedRoute] = useState(true);

  // 컴포넌트 마운트 시 데이터 로딩
  useEffect(() => {
    let courses = location.state?.confirmedCourses || [];
    let parking = location.state?.parkingData || [];

    // state에 데이터가 없다면 localStorage에서 불러오기
    if (courses.length === 0) {
      const storedCourses = localStorage.getItem('confirmedCourses');
      if (storedCourses) {
        courses = JSON.parse(storedCourses);
        console.log("localStorage에서 코스 데이터를 불러왔습니다.");
        localStorage.removeItem('confirmedCourses'); // 데이터 사용 후 삭제
      }
    }
    if (parking.length === 0) {
      const storedParking = localStorage.getItem('parkingData');
      if (storedParking) {
        parking = JSON.parse(storedParking);
        console.log("localStorage에서 주차 데이터를 불러왔습니다.");
        localStorage.removeItem('parkingData'); // 데이터 사용 후 삭제
      }
    }

    setConfirmedCourses(courses);
    setParkingData(parking);
    
    // 초기 activePlaceId 설정
    if (courses.length > 0) {
      setActivePlaceId(courses[0].id);
    }
    
    // 디버그: 받아온 데이터 확인
    console.log("Detail 컴포넌트 데이터:", {
      courses,
      parking,
    });
  }, [location.state]);

  const activePlace = confirmedCourses.find(
    (place) => place.id === activePlaceId
  );

  const toggleExpand = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
    setActivePlaceId(id);
    const placeElement = document.querySelector(`[data-id="${id}"]`);
    if (placeElement) {
      placeElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handlePinClick = (id) => {
    console.log("핀 클릭됨:", id);
    setRecommendedRoute(false);
    toggleExpand(id);
  };

  const renderRouteItems = () => {
    return confirmedCourses.map((place, idx) => {
      const isExpanded = expandedItemId === place.id;
      const isActive = place.id === activePlaceId;

      return (
        <div
          key={place.id}
          data-id={place.id}
          onClick={() => toggleExpand(place.id)}
          className="relative mb-[60px] cursor-pointer transition-all duration-300 flex items-center"
        >
          <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-gray-400 text-white flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
            {idx + 1}
          </div>
          <div
            className={`flex flex-col flex-grow px-5 py-3 rounded-xl border ${
              isExpanded
                ? "border-pink-500 border-[3px] shadow-md z-10 bg-white"
                : "border-[#E387A1] border-2"
            }`}
          >
            <h3 className="text-2xl">{place.name}</h3>
            {isExpanded && (
              <>
                <div className="flex items-center gap-1 text-sm my-1">
                  <span className="font-semibold text-gray-800">
                    {place.rating}
                  </span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 fill-current ${
                          i < Math.floor(place.rating)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.176-6.645L.587 7.645l6.545-.943L10 1l2.868 5.702 6.545.943-4.705 4.09 1.176 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm mt-[20px]">
                  <span className="font-semibold">소개글</span> |{" "}
                  {place.description}
                </p>
              </>
            )}
            <div className="flex justify-between items-center mt-[20px] gap-1 text-sm text-gray-500">
              <div>
                <span className="text-gray-500">{place.type}</span> .
                <span>{place.address}</span>
              </div>
              <div className="text-sm text-gray-400">자세히 보기 &gt;</div>
            </div>
          </div>
          {isActive && place.duration && (
            <div className="absolute top-1/2 left-[-110px] -translate-y-1/2 bg-white rounded-lg p-2 text-xs border border-gray-300 shadow-sm">
              <span className="font-semibold">도보 + 버스</span>
              <br />
              {place.duration}
            </div>
          )}
          {isExpanded && idx !== confirmedCourses.length - 1 && (
            <div className="flex justify-center ml-[20px] absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 text-2xl text-[#E387A1] font-bold">
              ↓
            </div>
          )}
        </div>
      );
    });
  };

  const renderCourseItems = () => {
    return <TimeLine courses={confirmedCourses} />;
  };

  const renderMapDetails = () => {
    if (recommendedRoute) return null;
    if (!activePlace) return null;

    return (
      <div className="border border-[#E387A1] m-5 absolute bottom-6 left-6 bg-white rounded-xl p-[30px] shadow-lg w-[980px] z-10">
        <div className="flex items-start gap-5">
          <div className="w-[150px] h-[150px] bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            {activePlace.image ? (
              <img
                src={activePlace.image}
                alt={activePlace.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                이미지 없음
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-bold">{activePlace.name}</h2>
                <span className="text-gray-400 text-base">|</span>
                <span className="text-gray-600 font-semibold">
                  {activePlace.type}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="font-bold text-xl mr-1">
                  {activePlace.rating}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-7 h-7 fill-current ${
                        i < Math.floor(activePlace.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.176-6.545L.587 7.645l6.545-.943L10 1l2.868 5.702 6.545.943-4.705 4.09 1.176 6.545z" />
                    </svg>
                  ))}
              </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm mb-2">
              <span className="font-semibold">소개 | </span>
              {activePlace.description}
            </p>
            <p className="text-gray-700 text-sm mb-2">
              <span className="font-semibold">주소 | </span>
              {activePlace.address}
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">주차 | </span>
              {activePlace.parking}
            </p>
            {/* 디버그 정보 */}
            {activePlace.latitude && activePlace.longitude && (
              <p className="text-gray-500 text-xs mt-2">
                좌표: {activePlace.latitude}, {activePlace.longitude}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[600px] p-8 border-r-2 border-[#E387A1] flex flex-col shadow-md">
        <div className="mt-[80px] mb-[40px]">
          <h1 className="text-2xl font-bold flex justify-center">
            안양토박이가 추천하는
            <br />
          </h1>
          <h1 className="text-2xl font-bold flex justify-center">
            연인을 위한 안양 맛집 데이트
          </h1>
        </div>
        <div className="flex flex-col flex-grow overflow-y-auto pr-4">
          {recommendedRoute ? renderCourseItems() : renderRouteItems()}
        </div>
        <div className="flex justify-between items-center mt-8 gap-4">
          <div className="flex-grow flex justify-center">
            <button
              onClick={() => setRecommendedRoute((prev) => !prev)}
              className={`w-[200px] h-[50px] px-4 py-2 rounded-2xl border-2 transition-colors duration-300 text-sm ${
                recommendedRoute
                  ? "ml-[66px] bg-[#E387A1] text-white border-[#E387A1]"
                  : "bg-white text-[#E387A1] border-[#E387A1]"
              }`}
            >
              추천 경로 한눈에 보기
            </button>
          </div>
          {recommendedRoute && (
            <button
              onClick={() => setShowParking((prev) => !prev)}
              className={`ml-auto w-[50px] h-[50px] rounded-2xl font-bold border-2 transition-colors duration-300 text-lg ${
                showParking
                  ? "bg-[#E387A1] text-white border-[#E387A1]"
                  : "bg-white text-[#E387A1] border-[#E387A1]"
              }`}
            >
              P
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 relative">
        <KakaoMap
          courses={confirmedCourses}
          parkingData={parkingData}
          showParking={showParking}
          onPinClick={handlePinClick}
          activePlace={activePlace}
          recommendedRoute={recommendedRoute}
        />
        {renderMapDetails()}
      </div>
    </div>
  );
};

export default Detail;
