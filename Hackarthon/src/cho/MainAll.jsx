// src/MainAll.jsx
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
  const navigate = useNavigate();

  // 단일 선택 컴포넌트(Main2, Main6)
  const handleSingleSelect = (item) => {
    setSelectedItems((prevItems) => {
      const categoryPrefix = item.split("_")[0]; // people_2인 → people
      const filteredItems = prevItems.filter(
        (i) => !i.startsWith(categoryPrefix)
      );
      return [...filteredItems, item];
    });
  };

  // 다중 선택 컴포넌트(Main3, Main4)
  const handleMultiSelect = (item) => {
    setSelectedItems((prevItems) => {
      if (prevItems.includes(item)) {
        return prevItems.filter((i) => i !== item);
      } else {
        return [...prevItems, item];
      }
    });
  };

  // 초기화
  const handleReset = () => {
    setSelectedItems([]);
    console.log("모든 선택 상태가 초기화되었습니다.");
  };

  // 🚀 추천 API 호출
  const handleRecommend = async () => {
    // 🔹 peopleCount (Main2)
    const peopleItem = selectedItems.find((i) => i.startsWith("people_"));
    const peopleCount = peopleItem ? peopleItem.replace("people_", "") : null;

    // 🔹 station (Main6)
    const stationItem = selectedItems.find((i) => i.startsWith("station_"));
    const selectedStation = stationItem
      ? stationItem.replace("station_", "")
      : null;

    // 🔹 culture (Main3)
    const cultureOptions = [
      "영화/공연/전시",
      "자연/야외",
      "지역 축제",
      "체험",
      "기타",
    ];
    const cultures = selectedItems.filter((i) => cultureOptions.includes(i));
    const culture = cultures.length === 1 ? cultures[0] : null;

    // 🔹 food (Main4)
    const foodOptions = ["카페", "한식", "중식", "양식", "일식", "기타"];
    const foods = selectedItems.filter((i) => foodOptions.includes(i));
    const food = foods.length === 1 ? foods[0] : null;

    // 📦 요청 Body
    const body = {
      date: new Date().toISOString().split("T")[0],
      peopleCount,
      culture,
      cultures: cultures.length > 1 ? cultures : [],
      food,
      foods: foods.length > 1 ? foods : [],
      selectedStation,
      transport: "지하철",
      numPlaces: 5,
    };

    console.log("📤 요청 Body:", body);

    try {
      const res = await axios.post(
        "http://43.203.141.38:8080/api/itineraries",
        body
      );
      console.log("✅ 추천 결과:", res.data);

      // 결과 페이지로 이동 (추천 결과와 출발역 전달)
      navigate("/Temporarily", {
        state: { result: res.data, selectedStation },
      });
    } catch (err) {
      console.error(
        "❌ API 호출 에러:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <div>
      <Main1 />
      <Main2 selectedItems={selectedItems} onItemToggle={handleSingleSelect} />
      <Main3 selectedItems={selectedItems} onItemToggle={handleMultiSelect} />
      <Main4 selectedItems={selectedItems} onItemToggle={handleMultiSelect} />
      <Main6 selectedItems={selectedItems} onItemToggle={handleSingleSelect} />
      <Main5 onReset={handleReset} onRecommend={handleRecommend} />
    </div>
  );
};

export default MainAll;
