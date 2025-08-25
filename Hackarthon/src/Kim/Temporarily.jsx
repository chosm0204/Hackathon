import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CourseBox from "./CourseBox";

const Temporarily = ({ courses: initialCourses, parkingData }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(initialCourses || []);
  const boxRefs = useRef([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    setCourses(initialCourses || []);
  }, [initialCourses]);

  useEffect(() => {
    boxRefs.current = boxRefs.current.slice(0, courses.length);
  }, [courses]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        boxRefs.current.length === courses.length &&
        boxRefs.current.every(Boolean)
      ) {
        const boxCenters = boxRefs.current.map(
          (el) => el.offsetTop + el.offsetHeight / 2
        );
        setPositions(boxCenters);
      } else {
        setPositions([]);
      }
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [courses]);

  const addCourseAt = (idx) => {
    if (courses.length >= 6) return;
    const newId = courses.length
      ? Math.max(...courses.map((c) => c.id)) + 1
      : 1;
    const newCourse = {
      id: newId,
      title: `새 장소 ${newId}`,
      category: "카테고리",
      description: "새로 추가된 코스",
    };
    const newCourses = [...courses];
    newCourses.splice(idx + 1, 0, newCourse);
    setCourses(newCourses);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };
  
  const handleConfirm = () => {
    // 로그인 로직을 제거하고, 토큰 유무와 관계없이 바로 Detail 페이지로 이동하도록 수정했습니다.
    // 최종 확정된 코스 데이터를 구성
    const confirmedCourses = courses.map((course, index) => ({
      id: course.id,
      name: course.title,
      title: course.title,
      category: course.category,
      type: course.category,
      description: course.description,
      address: course.address || "주소 정보 없음",
      rating: course.rating || 4.5,
      parking: course.parking || "주차 정보 없음",
      latitude: course.latitude,
      longitude: course.longitude,
      top: course.top,
      left: course.left,
      duration: `${index * 15 + 10}분`,
      image: course.image,
    }));
    
    // 토큰 확인 없이 바로 Detail 페이지로 이동
    navigate("/Detail", {
      state: {
        confirmedCourses: confirmedCourses,
        parkingData: parkingData,
      },
    });
  };

 

  return (
    <div className="flex flex-col items-center">
      <img
        src="/img/map.png"
        alt="배경 지도"
        className="fixed inset-0 w-full h-full object-cover -z-10 opacity-40"
      />
      <div className="fixed inset-0 bg-white/30 backdrop-blur-[5px] -z-10" />

      <div className="relative flex justify-center w-full max-w-5xl min-h-[600px]">
        <div className="relative w-28 flex flex-col items-center">
          {positions.length > 0 && (
            <>
              {positions.slice(0, -1).map((pos, idx) => (
                <div
                  key={idx}
                  className="border-l-2 border-[#E387A1] absolute left-1/2 transform -translate-x-1/2"
                  style={{ top: pos, height: positions[idx + 1] - pos }}
                />
              ))}
              {positions.map((pos, idx) => (
                <div
                  key={idx}
                  className="bg-[#E387A1] rounded-full w-6 h-6 flex items-center justify-center select-none absolute left-1/2 transform -translate-x-1/2 text-white text-sm"
                  style={{ top: pos - 12 }}
                >
                  {idx + 1}
                </div>
              ))}
            </>
          )}
        </div>

        <div className="flex flex-col ml-12 w-full max-w-[600px] mt-[60px] space-y-8 mb-12">
          {courses.map((course, idx) => (
            <React.Fragment key={course.id}>
              <div ref={(el) => (boxRefs.current[idx] = el)}>
                <CourseBox course={course} onDelete={deleteCourse} />
              </div>
              {idx !== courses.length - 1 && courses.length < 6 && (
                <div
                  className="flex justify-center mb-8"
                  style={{ width: 500 }}
                >
                  <button
                    className="text-gray-500 flex items-center justify-center text-sm"
                    onClick={() => addCourseAt(idx)}
                  >
                    + <br /> 경로 추가
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-24 p-4 justify-center items-center w-full max-w-5xl mb-24">
        <button className="bg-white text-sm border border-[#E387A1] px-4 py-2 rounded min-w-[180px] mr-3">
          <a href="/Temporarily">전체 경로 새로 추천받기</a>
        </button>
        <button
          className="text-sm text-white px-4 py-2 rounded min-w-[180px] ml-3 bg-[#E387A1]"
          onClick={handleConfirm}
        >
          추천 경로 확정하기
        </button>
      </div>
    </div>
  );
};

export default Temporarily;