import React, { useEffect, useRef, useState } from "react";
import CourseBox from "./CourseBox";
import LoginModal from "./LoginModal";

const Temporarily = ({ courses: initialCourses }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "카페 아톨",
      category: "브런치",
      description: "추천 카페 소개~",
    },
    {
      id: 2,
      title: "성결공원",
      category: "공원",
      description: "추천 공원 소개~",
    },
    { id: 3, title: "맛집 A", category: "한식", description: "한식 맛집 추천" },
    {
      id: 4,
      title: "카페 B",
      category: "카페",
      description: "분위기 좋은 카페",
    },
  ]);

  const boxRefs = useRef([]);
  const [positions, setPositions] = useState([]);

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

  // 코스 추가
  const addCourseAt = (idx) => {
    if (courses.length >= 6) return; // 최대 6개 제한
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

  // 코스 삭제
  const deleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <div className=" flex flex-col items-center">
      <div className="relative flex justify-center w-full max-w-5xl min-h-[600px]">
        {/* 왼쪽: 세로라인 + 마크 */}
        <div className="relative w-28 flex flex-col items-center">
          {positions.length > 0 && (
            <>
              {/* 세로라인 */}
              {positions.slice(0, -1).map((pos, idx) => (
                <div
                  key={idx}
                  className="border-l-2 border-[#E387A1] absolute left-1/2 transform -translate-x-1/2"
                  style={{
                    top: pos,
                    height: positions[idx + 1] - pos,
                  }}
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

        {/* 오른쪽: 코스 박스 */}
        <div className="flex flex-col ml-12 w-full max-w-[600px] mt-[60px] space-y-8 mb-12">
          {courses.map((course, idx) => (
            <React.Fragment key={course.id}>
              <div ref={(el) => (boxRefs.current[idx] = el)}>
                <CourseBox course={course} onDelete={deleteCourse} />
              </div>

              {/* 경로 추가 버튼: 최대 6개까지만 */}
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

      {/* 하단 버튼 */}
      <div className="flex gap-4 mt-24 p-4 justify-center items-center w-full max-w-5xl mb-24">
        <button className="bg-white text-sm border border-[#E387A1] px-4 py-2 rounded min-w-[180px] mr-3">
          <a href="/Temporarily">전체 경로 새로 추천받기</a>
        </button>
        <button
          className="text-sm text-white px-4 py-2 rounded min-w-[180px] ml-3 bg-[#E387A1]"
          onClick={() => setShowLoginModal(true)}
        >
          추천 경로 확정하기
        </button>
      </div>

      {/* 로그인 모달 */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default Temporarily;
