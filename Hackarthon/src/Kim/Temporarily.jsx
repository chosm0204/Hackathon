import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CourseBox from "./CourseBox";
import LoginModal from "./LoginModal";

const Temporarily = ({ courses: initialCourses, parkingData }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(initialCourses || []);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const boxRefs = useRef([]);
  const [positions, setPositions] = useState([]);

  // 디버깅: props 확인
  console.log("🔍 Temporarily - initialCourses:", initialCourses);
  console.log("🔍 Temporarily - parkingData:", parkingData);
  console.log("🔍 Temporarily - courses state:", courses);

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
    // Detail 페이지에서 예상하는 데이터 구조로 변환
    const confirmedCourses = courses.map((course, index) => ({
      id: course.id,
      name: course.title, // title -> name 변경
      title: course.title,
      category: course.category,
      type: course.category, // category -> type 추가
      description: course.description,
      address: course.address || "주소 정보 없음",
      rating: course.rating || 4.5, // 기본값 설정
      parking: course.parking || "주차 정보 없음",
      latitude: course.latitude,
      longitude: course.longitude,
      top: course.top, // 좌표가 있다면 유지
      left: course.left,
      duration: `${index * 15 + 10}분`, // 예상 소요시간 추가
      image: course.image, // 이미지가 있다면 유지
    }));

    console.log("🔍 Detail로 전달할 데이터:", confirmedCourses);

    navigate("/Detail", {
      state: {
        confirmedCourses: confirmedCourses,
        parkingData: parkingData,
      },
    });
  };

  // 디버깅: 코스가 없을 때 대체 UI
  if (!courses || courses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#AC4562] mb-4">
            추천 코스를 준비중입니다
          </h2>
          <p className="text-gray-600 mb-4">코스 데이터가 없습니다.</p>
          <div className="text-sm text-gray-400">
            <p>initialCourses: {JSON.stringify(initialCourses)}</p>
            <p>courses: {JSON.stringify(courses)}</p>
          </div>
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
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default Temporarily;
