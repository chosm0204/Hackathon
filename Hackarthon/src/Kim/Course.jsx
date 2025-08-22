import React, { useState } from 'react';
import ParkingPin from './ParkingPin';
import TimeLine from "./TimeLine";




const confirmedCourses = [
    { id: 1, name: '카페 아톨', type: '브랜치', rating: 4.4, description: '아늑한 분위기', address: '동안구', duration: '15분', parking: '주차 가능 (유료 / 1층 5대)', image: null, top: 200, left: 200 },
    { id: 2, name: '성결공원', type: '편의시설', rating: 3.8, description: '강아지 산책로--', address: '동안구', duration: '15분', parking: '주차 가능 (무료)', image: null, top: 150, left: 300 },
    { id: 3, name: '닭볶음탕집', type: '식당', rating: 4.7, description: '찐 현지맛집--', address: '동안구', duration: '15분', parking: '주차 가능', image: null, top: 250, left: 550 },
    { id: 4, name: '안양시 플리마켓', type: '지역 축제', rating: 4.1, description: '볼거리 놀거리--', address: '동안구', duration: '15분', parking: '주차 가능', image: null, top: 180, left: 750 },
    { id: 5, name: '포장마차', type: '식당', rating: 3.8, description: '옛 감성이 가득한 곳', address: '동안구', duration: '15분', parking: '주차 불가능', image: null, top: 230, left: 1000 },
    { id: 6, name: '안양일번가', type: '쇼핑', rating: 4.5, description: '활기찬 번화가', address: '동안구', parking: '주차 가능', image: null },
];

const Course = () => {
    const [showParking, setShowParking] = useState(false); 

    return (
        <div className="flex pt-[75px] justify-center">
            {/* 왼쪽: 코스 리스트 */}
            <div className="flex flex-col w-[800px]  border pt-20">
                {/* 제목 */}
                <h2 className="text-lg font-bold mb-4 text-center">
                    안양토박이가 추천하는
                    <br />
                    연인을 위한 안양 맛집 데이트
                </h2>
                {/* 코스 리스트 */}
                <div className="flex pt-[75px] justify-center">
                    <TimeLine courses={confirmedCourses} />
                </div>

                {/* 하단 버튼 (주차장 핀 토글) */}
                <div className="flex justify-end mt-6 relative p-4">
                    <button
                        onClick={() => setShowParking((prev) => !prev)}
                        className={`px-4 py-2 rounded font-bold border-2 transition-colors duration-300 text-lg
                            ${showParking 
                                ? 'bg-[#E387A1] text-white border-[#E387A1]' 
                                : 'bg-white text-[#E387A1] border-[#E387A1]'
                            }`}
                    >
                        P
                    </button>
                </div>
            </div>

            {/* 오른쪽: 지도 + 코스 핀 */}
            <div className="relative border">
                {/* 지도 */}
                <img
                    src="/img/Heongimg.jpg"
                    alt="temporaily"
                    className="w-full h-auto object-cover"
                />

                {/* 코스 핀 */}
                {confirmedCourses.map((course, idx) => (
                    <div
                        key={course.id}
                        className="absolute w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center font-bold select-none shadow-md"
                        style={{
                            top: course.top,
                            left: course.left,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        {idx + 1}
                    </div>
                ))}

                {/* 코스 연결선 */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    {confirmedCourses.map((course, idx) => {
                        if (idx === confirmedCourses.length - 1) return null;
                        const next = confirmedCourses[idx + 1];
                        return (
                            <line
                                key={idx}
                                x1={course.left}
                                y1={course.top}
                                x2={next.left}
                                y2={next.top}
                                stroke="#dc89d7ff"
                                strokeWidth="2"
                            />
                        );
                    })}
                </svg>

                {/* 주차장 핀 */}
                {showParking && <ParkingPin />}
            </div>
        </div>
    );
};

export default Course;
