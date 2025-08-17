// src/cho/Main.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HEADER = 80; // 고정 헤더 높이(px)
const WHITE_OFFSET = 320; // 섹션2(하얀 배경)를 첫 화면에서 얼마나 위로 당길지(px)

const CATEGORIES = [
  { key: "인원수", items: ["1인", "2인", "3인", "4인 이상"] },
  { key: "먹거리", items: ["감성 카페", "중식", "양식", "일식", "기타"] },
  {
    key: "문화생활",
    items: ["영화", "공연/전시", "체험", "지역 축제", "기타"],
  },
  { key: "교통수단", items: ["대중교통", "자동차", "도보", "기타"] },
];

export default function Main() {
  const navigate = useNavigate();
  const [form, setForm] = useState(() =>
    Object.fromEntries(CATEGORIES.map(({ key }) => [key, []]))
  );

  const toggle = (group, value) =>
    setForm((f) => {
      const has = f[group].includes(value);
      return {
        ...f,
        [group]: has
          ? f[group].filter((v) => v !== value)
          : [...f[group], value],
      };
    });

  const reset = () =>
    setForm(Object.fromEntries(CATEGORIES.map(({ key }) => [key, []])));

  const submit = (e) => {
    e.preventDefault();
    console.log("선택값:", form);
    navigate("/temporarily");
  };

  return (
    <div className="relative snap-y snap-mandatory">
      {/* 고정 배경 */}
      <img
        src="/img/map.png"
        alt=""
        className="fixed inset-0 w-full h-full object-cover -z-10"
      />
      <div className="fixed inset-0 bg-white/30 backdrop-blur-[5px] -z-10" />

      {/* 섹션 1: 히어로 */}
      <section
        className="snap-start flex flex-col items-center justify-center px-4"
        style={{ minHeight: `calc(100vh - ${HEADER}px)`, paddingTop: HEADER }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-center">
          어디서 뭐하지?
        </h1>
        <p className="mt-4 text-4xl font-semibold text-center mb-56">
          오직 (유저)님을 위한 하루를 DayMaker에게 추천받으세요!
        </p>
      </section>

      {/* 섹션 2: 하얀 배경 (첫 화면에서도 일부 보임) */}
      <section
        id="detail"
        className="snap-start flex items-center pb-16 transition-all duration-500"
        style={{
          minHeight: `calc(100vh - ${HEADER}px)`,
          paddingTop: HEADER,
          scrollMarginTop: HEADER,
          marginTop: -WHITE_OFFSET, // 첫 화면에서 위로 당겨 표시
        }}
      >
        <div className="w-full h-full rounded-t-[48px] border border-pink-200 bg-white/80 shadow-xl p-6 md:p-10">
          <form onSubmit={submit} className="w-full">
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-60 items-start justify-items-center">
              {CATEGORIES.map(({ key, items }) => (
                <fieldset key={key} className="text-center">
                  <legend className="text-lg md:text-xl font-semibold text-gray-800 mx-auto">
                    {key}
                  </legend>
                  <div className="mt-3 h-0.5 w-28 bg-pink-300 rounded-full mx-auto md:mx-0" />

                  <div className="mt-5 space-y-3">
                    {items.map((label) => {
                      const id = `${key}-${label}`;
                      const checked = form[key].includes(label);
                      return (
                        <label
                          key={id}
                          htmlFor={id}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            id={id}
                            type="checkbox"
                            className="h-5 w-5 rounded-md border-2 border-pink-300 accent-pink-500 shrink-0 align-middle translate-y-[1px]"
                            checked={checked}
                            onChange={() => toggle(key, label)}
                          />
                          <span className="text-gray-700 leading-tight">
                            {label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={reset}
                className="px-16 py-3 rounded-2xl border-2 border-pink-300 text-pink-500 bg-white hover:bg-pink-50 transition shadow-sm"
              >
                초기화
              </button>
              <button
                type="submit"
                className="px-16 py-3 rounded-2xl bg-pink-400 hover:bg-pink-500 text-white font-medium transition shadow-md"
              >
                AI 추천받기
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
