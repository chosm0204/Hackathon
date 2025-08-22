import React from "react";

const TimeLine = ({ courses, startPoint }) => {
    return (
        <div className="relative flex flex-col items-start">
            {/* 세로 라인 (마크 사이만 연결되도록) */}
            <div className="absolute top-0 bottom-0 left-[12px] w-[2px] bg-gray-300 z-0"></div>

            {/* 출발지 */}
            <div className="flex items-center mb-12 relative z-10">
            <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                S
            </div>
            <p className="ml-12 text-gray-700 font-semibold">출발지</p>
            </div>

            {/* 각 코스 */}
            {courses.map((course, idx) => (
                <div
                    key={course.id}
                    className="flex items-center mb-12 relative z-10"
                >
                    {/* 마크 */}
                    <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                        {idx + 1}
                    </div>
                    {/* 텍스트 */}
                    <p className="ml-12 text-gray-700">{course.name}</p>
                </div>
            ))}
        </div>
    );
};

export default TimeLine;
