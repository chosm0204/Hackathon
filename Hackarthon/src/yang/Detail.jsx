import React, { useState } from 'react';
import TimeLine from '../Kim/TimeLine';

const ParkingPin = () => {
    const parkingData = [
        { id: 'p1', top: 180, left: 220, name: '주차장 A' },
        { id: 'p2', top: 160, left: 350, name: '주차장 B' },
        { id: 'p3', top: 200, left: 500, name: '주차장 C' },
        { id: 'p4', top: 350, left: 750, name: '주차장 D' },
    ];
    return (
        <>
            {parkingData.map((pin) => (
                <div
                    key={pin.id}
                    className="absolute w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold select-none shadow-md"
                    style={{
                        top: pin.top,
                        left: pin.left,
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    P
                </div>
            ))}
        </>
    );
};

const routeData = [
    { id: 1, name: '카페 아톨', type: '브랜치', rating: 4.4, description: '아늑한 분위기', address: '동안구', duration: '15분', parking: '주차 가능 (유료 / 1층 5대)', image: null, top: 200, left: 200 },
    { id: 2, name: '성결공원', type: '편의시설', rating: 3.8, description: '강아지 산책로--', address: '동안구', duration: '15분', parking: '주차 가능 (무료)', image: null, top: 150, left: 300 },
    { id: 3, name: '닭볶음탕집', type: '식당', rating: 4.7, description: '찐 현지맛집--', address: '동안구', duration: '15분', parking: '주차 가능', image: null, top: 250, left: 550 },
    { id: 4, name: '안양시 플리마켓', type: '지역 축제', rating: 4.1, description: '볼거리 놀거리--', address: '동안구', duration: '15분', parking: '주차 가능', image: null, top: 180, left: 750 },
    { id: 5, name: '포장마차', type: '식당', rating: 3.8, description: '옛 감성이 가득한 곳', address: '동안구', duration: '15분', parking: '주차 불가능', image: null, top: 230, left: 1000 },
    { id: 6, name: '안양일번가', type: '쇼핑', rating: 4.5, description: '활기찬 번화가', address: '동안구', parking: '주차 가능', image: null },
];

const Detail = () => {
    const [activePlaceId, setActivePlaceId] = useState(routeData.length > 0 ? routeData[0].id : null);
    const [expandedItemId, setExpandedItemId] = useState(null);
    const activePlace = routeData.find(place => place.id === activePlaceId);

    const [showParking, setShowParking] = useState(false);
    const [recommendedRoute, setRecommendedRoute] = useState(false);

    // 상세 정보 확장/축소와 지도 정보 변경을 통합한 함수
    const toggleExpand = (id) => {
        setExpandedItemId(expandedItemId === id ? null : id);
        setActivePlaceId(id);
        const placeElement = document.querySelector(`[data-id="${id}"]`);
        if (placeElement) {
            placeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };
    
    // 핀을 클릭했을 때 호출되는 새로운 함수
    const handlePinClick = (id) => {
        setRecommendedRoute(false); // 타임라인 모드에서 목록 모드로 전환
        toggleExpand(id); // 해당 아이템 상세 정보 확장
    };

    const renderRouteItems = () => {
        return routeData.map((place, idx) => {
            const isExpanded = expandedItemId === place.id;
            const isActive = place.id === activePlaceId;
            return (
                <div
                    key={place.id}
                    data-id={place.id}
                    onClick={() => toggleExpand(place.id)}
                    className="relative mb-[60px] cursor-pointer transition-all duration-300 flex items-center" // items-start -> items-center로 변경
                >
                    {/* 마크 */}
                    <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-gray-400 text-white flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                        {idx + 1}
                    </div>
                    <div
                        className={`flex flex-col flex-grow px-5 py-3 rounded-xl border ${
                            isExpanded ? "border-pink-500 border-[3px] shadow-md z-10 bg-white" : "border-[#E387A1] border-2"
                        }`}
                    >
                        <h3 className="text-2xl ">{place.name}</h3>
                        {isExpanded && (
                            <>
                                <div className="flex items-center gap-1 text-sm my-1">
                                    <span className="font-semibold text-gray-800">{place.rating}</span>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className={`w-4 h-4 fill-current ${i < Math.floor(place.rating) ? "text-yellow-500" : "text-gray-300"}`} viewBox="0 0 20 20">
                                                <path d="M10 15l-5.878 3.09 1.176-6.545L.587 7.645l6.545-.943L10 1l2.868 5.702 6.545.943-4.705 4.09 1.176 6.545z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm mt-[20px]"><span className="font-semibold">소개글</span> | {place.description}</p>
                            </>
                        )}
                        <div className="flex justify-between items-center mt-[20px] gap-1 text-sm text-gray-500">
                            <div>
                                <span className="text-gray-500">{place.type}</span> .<span>{place.address}</span>
                            </div>
                            <div className="text-sm text-gray-400">자세히 보기 &gt;</div>
                        </div>
                    </div>
                    
                    {isActive && place.duration && (
                        <div className="absolute top-1/2 left-[-110px] -translate-y-1/2 bg-white rounded-lg p-2 text-xs border border-gray-300 shadow-sm">
                            <span className="font-semibold">도보 + 버스</span><br />{place.duration}
                        </div>
                    )}  
                    {isExpanded && idx !== routeData.length - 1 && (
                        <div className="flex justify-center ml-[20px] absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 text-2xl text-[#E387A1] font-bold">
                            ↓
                        </div>
                    )}
                </div>
            );
        });
    };

    const renderCourseItems = () => {
        return <TimeLine courses={routeData} />;
    };

    const renderMapPins = () => {
      if (!recommendedRoute) {
        return null;
      }
      
      const coursesWithCoords = routeData.filter(place => place.top && place.left);
      return (
        <>
          {coursesWithCoords.map((course, idx) => (
              <div
                  key={course.id}
                  onClick={() => handlePinClick(course.id)} 
                  className="absolute w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center font-bold select-none shadow-md cursor-pointer" 
                  style={{ top: course.top, left: course.left, transform: 'translate(-50%, -50%)' }}
              >
                  {idx + 1}
              </div>
          ))}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {coursesWithCoords.map((course, idx, arr) => {
                  if (idx === arr.length - 1) return null;
                  const next = arr[idx + 1];
                  return (
                      <line
                          key={idx}
                          x1={course.left} y1={course.top} x2={next.left} y2={next.top}
                          stroke="#dc89d7ff" strokeWidth="2"
                      />
                  );
              })}
          </svg>
        </>
      );
    }

    const renderMapDetails = () => {
      if (recommendedRoute) {
        return null;
      }

      return activePlace && (
        <div className="border border-[#E387A1] m-5 absolute bottom-6 left-6 bg-white rounded-xl p-[30px] shadow-lg w-[980px]">
          <div className="flex items-start gap-5">
            <div className="w-[150px] h-[150px] bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              {activePlace.image ? (<img src={activePlace.image} alt={activePlace.name} className="w-full h-full object-cover" />) : (<div></div>)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-bold">{activePlace.name}</h2>
                  <span className="text-gray-400 text-base">|</span>
                  <span className="text-gray-600 font-semibold">{activePlace.type}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-bold text-xl mr-1">{activePlace.rating}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (<svg key={i} className={`w-7 h-7 fill-current ${i < Math.floor(activePlace.rating) ? 'text-yellow-500' : 'text-gray-300'}`} viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.176-6.545L.587 7.645l6.545-.943L10 1l2.868 5.702 6.545.943-4.705 4.09 1.176 6.545z" /></svg>))}
                  </div>
              </div>
              </div>
              <p className="text-gray-700 text-sm mb-2"><span className="font-semibold">소개 | </span>{activePlace.description}</p>
              <p className="text-gray-700 text-sm mb-2"><span className="font-semibold">주소 | </span> {activePlace.address}</p>
              <p className="text-gray-700 text-sm"><span className="font-semibold">주차 | </span> {activePlace.parking}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-[600px] p-8 border-r-2 border-[#E387A1] flex flex-col shadow-md">
                <div className="mt-[80px] mb-[40px]">
                    <h1 className="text-2xl font-bold flex justify-center ">안양토박이가 추천하는<br /></h1>
                    <h1 className="text-2xl font-bold flex justify-center ">연인을 위한 안양 맛집 데이트</h1>
                </div>
                <div className="flex flex-col flex-grow overflow-y-auto pr-4">
                    {recommendedRoute ? renderCourseItems() : renderRouteItems()}
                </div>
                
                <div className='flex justify-between items-center mt-8 gap-4'>
                    <div className="flex-grow flex justify-center">
                        <button 
                            onClick={() => setRecommendedRoute((prev) => !prev)}
                            className={`w-[200px] h-[50px] px-4 py-2 rounded-2xl border-2 transition-colors duration-300 text-sm 
                                ${recommendedRoute ? 'bg-[#E387A1] text-white border-[#E387A1]' : 'bg-white text-[#E387A1] border-[#E387A1]'}`}
                        >
                            {recommendedRoute ? '추천 경로 한눈에 보기' : '추천 경로 한눈에 보기'}
                        </button>
                    </div>
                    
                    {recommendedRoute && (
                        <button
                            onClick={() => setShowParking((prev) => !prev)}
                            className={`ml-auto w-[50px] h-[50px] rounded-2xl font-bold border-2 transition-colors duration-300 text-lg
                                ${showParking 
                                    ? 'bg-[#E387A1] text-white border-[#E387A1]' 
                                    : 'bg-white text-[#E387A1] border-[#E387A1]'
                                }`}
                        >
                            P
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 relative">
                <img
                    src="/img/Heongimg.jpg"
                    alt="map"
                    className="w-full h-auto object-cover"
                />
                
                {renderMapPins()}
                {renderMapDetails()}
                
                {recommendedRoute && showParking && <ParkingPin />}
            </div>
        </div>
    );
};

export default Detail;