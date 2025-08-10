// src/cho/Main.jsx
import { useEffect, useState } from "react";

const HEADER = 80; // ⬅️ 실제 고정 헤더 높이(px)로 바꾸세요

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
  const [showDetail, setShowDetail] = useState(false);
  const [form, setForm] = useState(() =>
    Object.fromEntries(CATEGORIES.map(({ key }) => [key, []]))
  );

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      setShowDetail(y > h * 0.3); // 스크롤이 화면의 30% 넘으면 상세 폼 페이드인
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  };

  return (
    <div className="relative snap-y snap-mandatory">
      {/* 고정 배경 */}
      <img
        src="/img/map.png"
        alt=""
        className="fixed inset-0 w-full h-full object-cover -z-10"
      />
      <div className="fixed inset-0 bg-white/30 backdrop-blur-[2px] -z-10" />

      {/* 섹션 1: 히어로 (헤더 보정) */}
      <section
        className="snap-start flex flex-col items-center justify-center px-4"
        style={{
          minHeight: `calc(100vh - ${HEADER}px)`,
          paddingTop: HEADER,
        }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-center">
          " 어디서 뭐하지? "
        </h1>
        <p className="mt-4 md:mt-6 text-lg md:text-2xl font-semibold text-center">
          오직 (유저)님을 위한 하루를 (서비스)에게 추천받으세요!
        </p>
      </section>

      {/* 섹션 2: 상세 폼 (화면 꽉 채움 + 헤더 보정 + 앵커 보정) */}
      <section
        id="detail"
        className={`snap-start flex items-center px-4 pb-16 transition-all duration-500 ${
          showDetail
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none"
        } -mt-32`}
        style={{
          minHeight: `calc(100vh - ${HEADER}px)`,
          paddingTop: HEADER,
          scrollMarginTop: HEADER, // 앵커/스무스 스크롤 시 헤더에 안 가리도록
        }}
      >
        <form
          onSubmit={submit}
          className="w-full h-full mx-auto rounded-[28px] border border-pink-200 bg-white/95 shadow-xl p-6 md:p-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {CATEGORIES.map(({ key, items }) => (
              <fieldset key={key}>
                <legend className="text-lg md:text-xl font-semibold text-gray-800">
                  {key}
                </legend>
                <div className="mt-3 h-0.5 w-28 bg-pink-300 rounded-full" />
                <div className="mt-5 space-y-4">
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
                          className="h-5 w-5 rounded border-2 border-pink-300 accent-pink-500"
                          checked={checked}
                          onChange={() => toggle(key, label)}
                        />
                        <span className="text-gray-700">{label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          {/* 버튼 */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={reset}
              className="px-8 py-3 rounded-2xl border-2 border-pink-300 text-pink-500 bg-white hover:bg-pink-50 transition shadow-sm"
            >
              초기화
            </button>
            <button
              type="submit"
              className="px-10 py-3 rounded-2xl bg-pink-400 hover:bg-pink-500 text-white font-medium transition shadow-md"
            >
              AI 추천받기
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
