import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

// ----------------------------------------------------
// 1. LoadingPage 컴포넌트
//    - 사용자 디자인을 적용하고, 토큰 유무에 따라 페이지를 분기 처리합니다.
// ----------------------------------------------------
const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedItems } = location.state || {};
  const [loadingText, setLoadingText] = useState("DayMaker가 당신의 하루를 만들고 있어요.");
  const [errorOccurred, setErrorOccurred] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    let timerId;

    // 토큰이 없는 경우, 로그인 페이지로 즉시 리디렉션
    if (!token) {
      setLoadingText("로그인 정보가 없습니다. 로그인 페이지로 이동합니다.");
      setErrorOccurred(true);
      timerId = setTimeout(() => {
        navigate("/login");
      }, 2000); // 2초 후 로그인 페이지로 이동
      return () => clearTimeout(timerId);
    }
    
    // selectedItems가 없는 경우, 메인 페이지로 돌아감
    if (!selectedItems) {
      setLoadingText("잘못된 접근입니다. 메인 페이지로 이동합니다.");
      setErrorOccurred(true);
      timerId = setTimeout(() => {
        navigate("/");
      }, 2000); // 2초 후 메인 페이지로 이동
      return () => clearTimeout(timerId);
    }

    // 토큰이 있고, 데이터가 있는 경우 API 호출을 진행합니다.
    const fetchData = async () => {
      try {
        const body = {
          date: new Date().toISOString().split("T")[0],
          peopleCount: selectedItems["인원수"][0],
          culture: selectedItems["문화생활"].length > 0 ? selectedItems["문화생활"][0] : null,
          cultures: selectedItems["문화생활"].length > 1 ? selectedItems["문화생활"].slice(1) : [],
          food: selectedItems["먹거리"].length > 0 ? selectedItems["먹거리"][0] : null,
          foods: selectedItems["먹거리"].length > 1 ? selectedItems["먹거리"].slice(1) : [],
          selectedStation: null, // 이 부분은 별도 컴포넌트에서 가져와야 하지만, 현재 예시에서는 null로 처리
          transport: selectedItems["교통수단"][0],
          numPlaces: 5,
        };

        const res = await axios.post(
          "http://43.203.141.38:8080/api/itineraries",
          body,
        );
        console.log("✅ 추천 결과:", res.data);

        // API 호출 성공 후 결과 페이지로 이동
        setLoadingText("하루 계획이 완성되었어요!");
        timerId = setTimeout(() => {
          navigate("/temporarily", { state: { result: res.data, selectedItems } });
        }, 1500);
      } catch (err) {
        console.error(
          "❌ API 호출 에러:",
          err.response ? err.response.data : err.message
        );
        setLoadingText("추천 요청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        setErrorOccurred(true);
        timerId = setTimeout(() => {
          navigate("/"); // 오류 발생 시 메인 페이지로 돌아갑니다.
        }, 3000);
      } finally {
        // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
        return () => clearTimeout(timerId);
      }
    };
    fetchData();
  }, [navigate, selectedItems, location]);

  return (
    <div className="relative w-full h-screen bg-cover bg-center flex items-center justify-center">
      {/* 배경 이미지 */}
      <img
        src="/img/map.png"
        alt="배경 지도"
        className="fixed inset-0 w-full h-full object-cover -z-10 opacity-40"
      />
      {/* 가운데 박스 */}
      <div className="w-[904px] h-[453px] border-4 border-[#E387A1] flex flex-col items-center justify-center bg-white backdrop-blur-sm rounded-xl shadow-lg relative">
        {/* 왼쪽 상단 회색 동그라미 3개 */}
        <div className="absolute top-3 left-3 flex gap-3">
          <span className="w-5 h-5 rounded-full bg-gray-300"></span>
          <span className="w-5 h-5 rounded-full bg-gray-300"></span>
          <span className="w-5 h-5 rounded-full bg-gray-300"></span>
        </div>
        {/* 로딩 아이콘 */}
        <div className="mb-6">
          {!errorOccurred ? (
            <div className="w-16 h-16 border-8 border-gray-300 border-t-[#E387A1] rounded-full animate-spin"></div>
          ) : (
            <div className="text-4xl text-red-500">❌</div>
          )}
        </div>
        <h1 className="text-2xl font-semibold text-center pt-4 px-4">
          {loadingText}
          <br />
          {loadingText.includes("이동") || loadingText.includes("완성") ? "" : "잠시만 기다려주세요."}
        </h1>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 2. Login 컴포넌트
//    - 이메일과 비밀번호로 로그인하는 페이지입니다.
// ----------------------------------------------------
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await axios.post(
        "http://43.203.141.38:8080/api/users/login",
        { email, password }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      setSuccessMessage("로그인 성공!");
      setTimeout(() => {
        navigate("/Detail");
      }, 1000);
    } catch (err) {
      console.error("로그인 실패:", err);
      setErrorMessage("로그인 실패! 이메일과 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="mt-[100px] flex items-center justify-center p-8">
      <div className="w-full p-8 max-w-2xl">
        <h2 className="text-center font-bold text-3xl ">로그인</h2>
        <p className="mt-[7px] text-center text-xl">
          DayMaker에 로그인하여 더 많은 기능을 이용해보세요!
        </p>
        <div className="space-y-6 mt-[70px]">
          <div>
            <p className="text-lg text-left font-bold">이메일</p>
            <input
              type="email"
              placeholder="ex) daymaker@naver.com"
              className="h-[50px] text-sm mt-2 px-3 py-2 w-full border border-pink-300 rounded-md shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <p className="text-lg text-left font-bold">비밀번호</p>
            <input
              type="password"
              placeholder="비밀번호 입력(영어대소문자, 숫자, 특수문자 포함 8자~20자)"
              className="h-[50px] text-sm mt-2 px-3 py-2 w-full border border-pink-300 rounded-md shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
        <div className="mt-[100px] flex justify-center">
          <button
            className="m-[25px] w-[250px] h-[70px] border border-[#E387A1] rounded-2xl text-sm font-medium bg-white hover:bg-pink-600"
            onClick={() => navigate("/Signup")}
          >
            회원가입하기
          </button>
          <button
            className="m-[25px] w-[250px] h-[70px] border rounded-2xl text-sm font-medium text-white bg-[#E387A1] hover:bg-pink-600"
            onClick={handleLogin}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 3. Main 컴포넌트
//    - 사용자 입력을 받는 메인 폼입니다.
// ----------------------------------------------------
const HEADER = 80;
const WHITE_OFFSET = 320;
const CATEGORIES = [
  { key: "인원수", items: ["1인", "2인", "3인", "4인 이상"] },
  { key: "먹거리", items: ["감성 카페", "중식", "양식", "일식", "기타"] },
  { key: "문화생활", items: ["영화", "공연/전시", "체험", "지역 축제", "기타"] },
  { key: "교통수단", items: ["대중교통", "자동차", "도보", "기타"] },
];

const Main = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(() =>
    Object.fromEntries(CATEGORIES.map(({ key }) => [key, []]))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const toggle = (group, value) =>
    setForm((f) => {
      const isSingleSelect = group === "인원수" || group === "교통수단";
      const has = f[group].includes(value);

      if (isSingleSelect) {
        return {
          ...f,
          [group]: has ? [] : [value],
        };
      } else {
        return {
          ...f,
          [group]: has
            ? f[group].filter((v) => v !== value)
            : [...f[group], value],
        };
      }
    });

  const reset = () => setForm(Object.fromEntries(CATEGORIES.map(({ key }) => [key, []])));

  const submit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // 토큰이 없는 경우, 모달을 띄우고 로그인 페이지로 이동 유도
    if (!token) {
      setModalMessage("추천을 받으려면 로그인이 필요합니다.");
      setShowModal(true);
      return;
    }

    if (form["인원수"].length === 0) {
      setModalMessage("인원수를 선택해주세요.");
      setShowModal(true);
      return;
    }
    if (form["교통수단"].length === 0) {
      setModalMessage("교통수단을 선택해주세요.");
      setShowModal(true);
      return;
    }

    // 모든 필수 항목이 선택되고 토큰이 있으면 로딩 페이지로 이동합니다.
    navigate("/LoadingPage", { state: { selectedItems: form } });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative snap-y snap-mandatory">
      <img src="/img/map.png" alt="" className="fixed inset-0 w-full h-full object-cover -z-10" />
      <div className="fixed inset-0 bg-white/30 backdrop-blur-[5px] -z-10" />
      <section className="snap-start flex flex-col items-center justify-center px-4" style={{ minHeight: `calc(100vh - ${HEADER}px)`, paddingTop: HEADER }}>
        <h1 className="text-4xl md:text-6xl font-extrabold text-center">어디서 뭐하지?</h1>
        <p className="mt-4 text-4xl font-semibold text-center mb-56">오직 (유저)님을 위한 하루를 DayMaker에게 추천받으세요!</p>
      </section>
      <section id="detail" className="snap-start flex items-center pb-16 transition-all duration-500" style={{ minHeight: `calc(100vh - ${HEADER}px)`, paddingTop: HEADER, scrollMarginTop: HEADER, marginTop: -WHITE_OFFSET }}>
        <div className="w-full h-full rounded-t-[48px] border border-pink-200 bg-white/80 shadow-xl p-6 md:p-10">
          <form onSubmit={submit} className="w-full">
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-60 items-start justify-items-center">
              {CATEGORIES.map(({ key, items }) => (
                <fieldset key={key} className="text-center">
                  <legend className="text-lg md:text-xl font-semibold text-gray-800 mx-auto">{key}</legend>
                  <div className="mt-3 h-0.5 w-28 bg-pink-300 rounded-full mx-auto md:mx-0" />
                  <div className="mt-5 space-y-3">
                    {items.map((label) => {
                      const id = `${key}-${label}`;
                      const checked = form[key].includes(label);
                      return (
                        <label key={id} htmlFor={id} className="flex items-center gap-3 cursor-pointer">
                          <input id={id} type="checkbox" className="h-5 w-5 rounded-md border-2 border-pink-300 accent-pink-500 shrink-0 align-middle translate-y-[1px]" checked={checked} onChange={() => toggle(key, label)} />
                          <span className="text-gray-700 leading-tight">{label}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button type="button" onClick={reset} disabled={isLoading} className="px-16 py-3 rounded-2xl border-2 border-pink-300 text-pink-500 bg-white hover:bg-pink-50 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">초기화</button>
              <button type="submit" disabled={isLoading} className="px-16 py-3 rounded-2xl bg-pink-400 hover:bg-pink-500 text-white font-medium transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? "추천 중..." : "AI 추천받기"}
              </button>
            </div>
          </form>
        </div>
      </section>
      {/* 커스텀 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-xl max-w-sm mx-auto">
            <h3 className="text-lg font-bold mb-4">알림</h3>
            <p className="text-gray-700 mb-6">{modalMessage}</p>
            <div className="flex justify-center">
              <button
                onClick={closeModal}
                className="bg-[#E387A1] text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// ----------------------------------------------------
// 4. App 컴포넌트 (라우팅)
// ----------------------------------------------------
// 임시 컴포넌트들
const Header = () => <header className="fixed w-full z-50 bg-white shadow-md p-4">헤더</header>;
const Footer = () => <footer className="bg-white shadow-md p-4 mt-8 text-center">푸터</footer>;
const Signup = () => <div>회원가입 페이지</div>;
const TemAll = () => {
    const location = useLocation();
    const { result, selectedItems } = location.state || {};
    return <div>임시 결과 페이지</div>;
};
const Detail = () => <div>상세 페이지</div>;
const Course = () => <div>코스 페이지</div>;
const ScrollTop = () => null;

const App = () => {
  const location = useLocation();
  const isDetailPage = location.pathname === '/Detail';

  return (
    <>
      <ScrollTop />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/LoadingPage" element={<LoadingPage />} />
        <Route path="/temporarily" element={<TemAll />} />
        <Route path="/Detail" element={<Detail />} />
        <Route path="/Course" element={<Course />} />
      </Routes>
      {!isDetailPage && <Footer />}
    </>
  );
};

// 최종 앱을 브라우저 라우터로 감싸줍니다.
const RootApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default RootApp;
