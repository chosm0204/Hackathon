import React, { useState, useEffect, useRef } from "react";
import CourseBox from "./CourseBox";
import LoginModal from "./LoginModal";

const Temporarily = () => {
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
    {
      id: 5,
      title: "공원 C",
      category: "공원",
      description: "산책하기 좋은 곳",
    },
  ]);

  const boxRefs = useRef([]);

  useEffect(() => {
    boxRefs.current = boxRefs.current.slice(0, courses.length);
  }, [courses]);

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        boxRefs.current.length === courses.length &&
        boxRefs.current.every(Boolean)
      ) {
        const boxCenters = boxRefs.current.map(
          (el) => el.offsetTop + el.offsetHeight / 2
        );
        const startMarkPos = boxCenters[0] - 72;
        const count = Math.min(courses.length, 10);
        const marks = [startMarkPos, ...boxCenters.slice(0, count)];
        setPositions(marks);
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

  return (
    <div className="mt-28 flex flex-col items-center">
      {/* 배경 이미지 
            <img
                src="/img/map.png"
                alt="배경 지도"
                className="fixed inset-0 w-full h-full object-cover -z-10 opacity-40"
            />
                  <div className="fixed inset-0 bg-white/30 backdrop-blur-[5px] -z-10" />
*/}
      <div>
        <h1 className="mb-24 text-center text-xl font-bold">
          안양토박이가 추천하는
          <br />
          연인을 위한 안양 맛집 데이트
        </h1>
      </div>

      <div className="relative flex justify-center w-full max-w-5xl min-h-[600px]">
        {/* 왼쪽: 세로라인 + 마크 영역 */}
        <div className="relative w-28 flex flex-col items-center">
          {positions.length > 0 && (
            <>
              {/* 출발지 마크 */}
              <div
                className="bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-gray-300 font-bold select-none absolute left-1/2 transform -translate-x-1/2"
                style={{ top: positions[0] - 12 }}
              >
                {" "}
                ●
              </div>

              {/* 출발지 텍스트 */}
              <div
                className="font-semibold text-sm select-none  absolute "
                style={{
                  top: positions[0] - 12,
                  left: "calc(50% + 104px)",
                  whiteSpace: "nowrap",
                }}
              >
                출발지<span className="mx-2">|</span>인덕원{" "}
              </div>

              {/* 세로라인  */}
              <div
                className="border-l-2 border-gray-300 absolute left-1/2 transform -translate-x-1/2"
                style={{
                  top: positions[0] + 12,
                  height: positions[positions.length - 1] - positions[0],
                }}
              />

              {/* 숫자 마크들 */}
              {positions.slice(1).map((pos, idx) => (
                <div
                  key={idx + 1}
                  className="bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center select-none absolute left-1/2 transform -translate-x-1/2"
                  style={{ top: pos - 12 }}
                >
                  {idx + 1}{" "}
                </div>
              ))}
            </>
          )}
        </div>

        {/* 오른쪽: 박스 리스트 영역 */}
        <div
          className={`flex flex-col ml-12 w-full max-w-[600px] mt-[60px] ${
            courses.length === 6 ? "space-y-10" : "space-y-8"
          } mb-12`}
        >
          {courses.map((course, idx) => (
            <React.Fragment key={course.id}>
              <div ref={(el) => (boxRefs.current[idx] = el)}>
                <CourseBox
                  course={course}
                  onDelete={deleteCourse}
                  disabledDelete={false}
                />
              </div>

              {idx !== courses.length - 1 && courses.length < 6 && (
                <div
                  className="flex justify-center mb-8"
                  style={{ width: 500 }}
                >
                  <button
                    className="text-gray-400 flex items-center justify-center text-sm"
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
          전체 경로 새로 추천받기
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
