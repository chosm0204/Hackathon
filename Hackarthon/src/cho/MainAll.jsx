import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Main1 from "./Main1";
import Main2 from "./Main2";
import Main3 from "./Main3";
import Main4 from "./Main4";
import Main5 from "./Main5";
import Main6 from "./Main6";

const MainAll = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();

  const handleSingleSelect = (item) => {
    // `_` 이전의 카테고리만 가져와 필터링
    const categoryPrefix = item.split("_")[0];
    setSelectedItems((prevItems) => {
      const filteredItems = prevItems.filter(
        (i) => !i.startsWith(categoryPrefix)
      );
      return [...filteredItems, item];
    });
  };

  const handleMultiSelect = (item) => {
    setSelectedItems((prevItems) => {
      if (prevItems.includes(item)) {
        return prevItems.filter((i) => i !== item);
      } else {
        return [...prevItems, item];
      }
    });
  };

  const handleReset = () => {
    setSelectedItems([]);
    console.log("모든 선택 상태가 초기화되었습니다.");
  };

  const handleRecommend = async () => {
    // 필수 선택 항목 검증
    const peopleItem = selectedItems.find((i) => i.startsWith("peopleCount_"));
    const stationItem = selectedItems.find((i) => i.startsWith("transport_"));

    if (!peopleItem) {
      alert("인원수를 선택해주세요.");
      return;
    }

    if (!stationItem) {
      alert("출발 지하철역을 선택해주세요.");
      return;
    }

    setIsLoading(true); // 로딩 시작

    try {
      // 🔹 peopleCount (Main2)
      const peopleCount = peopleItem.replace("peopleCount_", "");

      // 🔹 station (Main6)
      const selectedStation = stationItem.replace("transport_", "");

      // 🔹 culture (Main3)
      const cultureItems = selectedItems.filter(
        (i) => i.startsWith("culture_") || i.startsWith("cultures_")
      );
      const culture =
        cultureItems.length === 1 ? cultureItems[0].split("_")[1] : null;
      const cultures =
        cultureItems.length > 1 ? cultureItems.map((i) => i.split("_")[1]) : [];

      // 🔹 food (Main4)
      const foodItems = selectedItems.filter(
        (i) => i.startsWith("food_") || i.startsWith("foods_")
      );
      const food = foodItems.length === 1 ? foodItems[0].split("_")[1] : null;
      const foods =
        foodItems.length > 1 ? foodItems.map((i) => i.split("_")[1]) : [];

      // 📦 요청 Body
      const body = {
        date: new Date().toISOString().split("T")[0],
        peopleCount,
        culture,
        cultures: cultures.length > 1 ? cultures : [],
        food,
        foods: foods.length > 1 ? foods : [],
        selectedStation,
        transport: "대중교통",
        numPlaces: 5,
      };

      console.log("🚀 API 요청 데이터:", body);

      const res = await axios.post(
        "http://43.203.141.38:8080/api/itineraries",
        body
      );

      console.log("✅ 추천 결과:", res.data);

      // ✅ API 응답 데이터를 TemAll로 전달 (라우트 경로와 일치)
      navigate("/TemAll", {
        state: {
          result: res.data,
          selectedStation: selectedStation,
          selectedItems: selectedItems, // 선택 항목도 함께 전달
        },
      });
    } catch (err) {
      console.error(
        "❌ API 호출 에러:",
        err.response ? err.response.data : err.message
      );

      // 에러 처리
      if (err.response?.status === 404) {
        alert("API 서버를 찾을 수 없습니다. 서버 상태를 확인해주세요.");
      } else if (err.response?.status >= 500) {
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else {
        alert("추천 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div>
      로딩 오버레이
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E387A1]"></div>
            <p className="mt-4 text-lg font-semibold text-[#AC4562]">
              DayMaker가 추천 코스를 만들고 있어요...
            </p>
          </div>
        </div>
      )}

      <Main1 />
      <Main2 selectedItems={selectedItems} onItemToggle={handleSingleSelect} />
      <Main3 selectedItems={selectedItems} onItemToggle={handleMultiSelect} />
      <Main4 selectedItems={selectedItems} onItemToggle={handleMultiSelect} />
      <Main6 selectedItems={selectedItems} onItemToggle={handleSingleSelect} />
      <Main5
        onReset={handleReset}
        onRecommend={handleRecommend}
        isLoading={isLoading} // 로딩 상태 전달
      />
    </div>
  );
};

export default MainAll;
