import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const routeData = [
  {
    id: 1,
    name: '카페 아톨',
    type: '브랜치',
    rating: 4.4,
    description: '아늑한 분위기',
    address: '동안구',
    duration: '15분',
    parking: '주차 가능 (유료 / 1층 5대)',
    image: null,
  },
  {
    id: 2,
    name: '성결공원',
    type: '편의시설',
    rating: 3.8,
    description: '강아지 산책로--',
    address: '동안구',
    duration: '15분',
    parking: '주차 가능 (무료)',
    image: null,
  },
  {
    id: 3,
    name: '닭볶음탕집',
    type: '식당',
    rating: 4.7,
    description: '찐 현지맛집--',
    address: '동안구',
    duration: '15분',
    parking: '주차 가능',
    image: null,
  },
  {
    id: 4,
    name: '안양시 플리마켓',
    type: '지역 축제',
    rating: 4.1,
    description: '볼거리 놀거리--',
    address: '동안구',
    duration: '15분',
    parking: '주차 가능',
    image: null,
  },
  {
    id: 5,
    name: '포장마차',
    type: '식당',
    rating: 3.8,
    description: '옛 감성이 가득한 곳',
    address: '동안구',
    duration: '15분',
    parking: '주차 불가능',
    image: null,
  },
  {
    id: 6,
    name: '안양일번가',
    type: '쇼핑',
    rating: 4.5,
    description: '활기찬 번화가',
    address: '동안구',
    parking: '주차 가능',
    image: null,
  },
  
];

const Detail = () => {
  const navigate = useNavigate();
  const [activePlaceId, setActivePlaceId] = useState(routeData.length > 0 ? routeData.at(0)?.id : null);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const placeRefs = useRef([]);
  const activePlace = routeData.find(place => place.id === activePlaceId);

  const gotoCourse = () => {
    navigate("/Course");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.dataset.id);
            setActivePlaceId(id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );

    placeRefs.current.forEach(ref => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      placeRefs.current.forEach(ref => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  const handlePlaceClick = (id) => {
    setActivePlaceId(id);
    const placeElement = placeRefs.current.find(ref => ref?.dataset?.id === id.toString());
    placeElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const toggleExpand = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const renderRouteItems = () => {
  return routeData.map((place, index) => {
    const isExpanded = expandedItemId === place.id;
    const isActive = place.id === activePlaceId;
    return (
      <div
        key={place.id}
        data-id={place.id}
        ref={el => {
          if (el) {
            placeRefs.current.find((ref, idx) =>
              parseInt(ref?.dataset?.id) === place.id
                ? placeRefs.current.splice(idx, 1, el)
                : null
            );
            if (!placeRefs.current.some(ref => parseInt(ref?.dataset?.id) === place.id)) {
              placeRefs.current.push(el);
            }
          }
        }}
        onClick={() => handlePlaceClick(place.id)}
        className="relative mb-[60px] cursor-pointer transition-all duration-300 flex"
      >
        {/* 왼쪽 원 + 세로선 */}
        

        {/* 기존 카드 */}
        <div
          onClick={() => toggleExpand(place.id)}
          className={`flex flex-col flex-grow px-5 py-4 rounded-xl border ${
            isExpanded
              ? "border-pink-500 border-2 shadow-md z-10 bg-white"
              : "border-[#E387A1]"
          }`}
        >
          <h3 className="text-2xl ">{place.name}</h3>
          {isExpanded && (
            <>
              <div className="flex items-center gap-1 text-sm my-1">
                <span className="font-semibold text-gray-800">{place.rating}</span>
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
                      <path d="M10 15l-5.878 3.09 1.176-6.545L.587 7.645l6.545-.943L10 1l2.868 5.702 6.545.943-4.705 4.09 1.176 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm mt-[20px]">
                <span className="font-semibold">소개글</span> | {place.description}
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
      </div>
    );
  });
};

  return (
    <div className="flex h-screen overflow-hidden ">
      {/* 왼쪽 사이드바 */}
      <div className="w-[450px] p-8 border-r-2 border-[#E387A1] flex flex-col shadow-md">
  <div className="mt-[100px] mb-16">
    <h1 className="text-2xl font-bold flex justify-center ">
      안양토박이가 추천하는<br />
    </h1>
    <h1 className="text-2xl font-bold flex justify-center ">
      연인을 위한 안양 맛집 데이트
    </h1>
  </div>

  <div className="flex flex-col flex-grow overflow-y-auto pr-4 ">
    <div className="">
      <div className="flex items-center gap-2 text-sm text-gray-700 mb-[70px] relative">
        
        <span className="font-semibold">출발지</span> |
        <span>인덕원역 4호선</span>
      </div>

      
        {/* 세로 라인 */}
        <div className=''></div>

        {/* 경로 아이템들 */}
        {renderRouteItems()}
      
    </div>
  </div>

  <div className="flex justify-center items-center mt-8">
    <button
      className="w-[240px] py-4 bg-white rounded-3xl text-base font-semibold border-[#E387A1] border-2 shadow-md hover:bg-pink-400"
      onClick={gotoCourse}
    >
      추천 경로 한눈에 보기
    </button>
  </div>
</div>


      {/* 오른쪽 지도 영역 */}
      <div className="flex-1 relative">
    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `` }}>
        {activePlace && (
            <div className="border border-[#E387A1] m-5 absolute bottom-6 left-6 bg-white rounded-xl p-[30px] shadow-lg w-[980px]">
                {/* 이미지와 텍스트 컨텐츠를 감싸는 메인 flex 컨테이너 */}
                <div className="flex items-start gap-5">
                    {/* 이미지 영역 */}
                    <div className="w-[150px] h-[150px] bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        {/* 이미지가 없을 때를 대비한 임시 이미지 */}
                        {activePlace.image ? (
                            <img src={activePlace.image} alt={activePlace.name} className="w-full h-full object-cover" />
                        ) : (
                            <div></div>
                        )}
                    </div>
                    {/* 텍스트 컨텐츠 영역 */}
                    <div className="flex-1">
                        {/* 제목 및 별점 영역 */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <h2 className="text-4xl font-bold">{activePlace.name}</h2>
                                <span className="text-gray-400 text-base">|</span>
                                <span className="text-gray-600 font-semibold">{activePlace.type}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                <span className="font-bold text-xl mr-1">{activePlace.rating}</span>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-7 h-7 fill-current ${i < Math.floor(activePlace.rating) ? 'text-yellow-500' : 'text-gray-300'}`} viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.176-6.545L.587 7.645l6.545-.943L10 1l2.868 5.702 6.545.943-4.705 4.09 1.176 6.545z" /></svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* 상세 정보 영역 */}
                        <p className="text-gray-700 text-sm mb-2"><span className="font-semibold">소개 | </span>{activePlace.description}</p>
                        <p className="text-gray-700 text-sm mb-2"><span className="font-semibold">주소 | </span> {activePlace.address}</p>
                        <p className="text-gray-700 text-sm"><span className="font-semibold">주차 | </span> {activePlace.parking}</p>
                    </div>
                </div>
            </div>
        )}
    </div>
</div>
    </div>
  );
};

export default Detail;