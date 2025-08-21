import React from 'react';

const CourseBox = ({ course, onDelete, disabledDelete, width = 500 }) => {
    return (
        <div
        className="relative bg-white rounded-lg border-2 border-[#E387A1] py-[14px]  pl-10 pr-10 shadow-md min-h-[130px]"
        style={{ width }}
        >
        {/* 경로삭제 버튼: 오른쪽 상단, 오른쪽 여백 추가 */}
            <button
                className={`absolute right-4 text-gray-400 text-xs ${
                disabledDelete ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
                onClick={() => !disabledDelete && onDelete(course.id)}
                disabled={disabledDelete}
                title={disabledDelete ? '삭제 불가' : '경로 삭제'}
            >
                경로삭제
            </button>

            <h2 className="font-bold text-lg pb-2 flex items-center">
                <span className="border-b-[1.5px] border-[#E387A1] pb-1 inline-block">
                {course.title}
                <span className="ml-5 font-normal text-sm text-gray-700">|</span>
                <span className="ml-5 font-normal text-sm text-gray-700">{course.category}</span>
                </span>
            </h2>

            <p className="text-sm text-gray-600 mt-2">{course.description}</p>

            {/* 새로고침 버튼: 오른쪽 하단 끝에, 오른쪽 여백 추가 */}
            <div className="flex justify-end mt-auto absolute bottom-3 right-2">
                <button className="text-gray-400 text-xs cursor-pointer px-2 py-1 rounded flex items-center gap-1 select-none">
                    <span className="text-sm select-none">⟳</span> 새로고침
                </button>
            </div>
        </div>
    );
};

export default CourseBox;
