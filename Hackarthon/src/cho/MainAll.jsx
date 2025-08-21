// src/MainAll.jsx
import React, { useState } from "react";
import Main1 from "./Main1";
import Main2 from "./Main2";
import Main3 from "./Main3";
import Main4 from "./Main4";
import Main5 from "./Main5";

const MainAll = () => {
  // 모든 선택 상태를 하나의 배열로 관리
  const [selectedItems, setSelectedItems] = useState([]);

  // 단일 선택 컴포넌트(Main2)를 위한 함수
  const handleSingleSelect = (item) => {
    setSelectedItems((prevItems) => {
      // 이미 해당 카테고리(예: 'people')의 항목이 있으면 제거하고 새 항목 추가
      const categoryPrefix = item.split("_")[0]; // 'people_1인'에서 'people' 추출
      const filteredItems = prevItems.filter(
        (i) => !i.startsWith(categoryPrefix)
      );
      return [...filteredItems, item];
    });
  };

  // 다중 선택 컴포넌트(Main3, Main4)를 위한 함수
  const handleMultiSelect = (item) => {
    setSelectedItems((prevItems) => {
      if (prevItems.includes(item)) {
        // 이미 선택된 항목이면 제거
        return prevItems.filter((i) => i !== item);
      } else {
        // 선택되지 않은 항목이면 추가
        return [...prevItems, item];
      }
    });
  };

  // Main5 초기화 버튼을 위한 함수
  const handleReset = () => {
    setSelectedItems([]);
    console.log("모든 선택 상태가 초기화되었습니다.");
  };

  return (
    <div>
      <Main1 />
      <Main2 selectedItems={selectedItems} onItemToggle={handleSingleSelect} />
      <Main3 selectedItems={selectedItems} onItemToggle={handleMultiSelect} />
      <Main4 selectedItems={selectedItems} onItemToggle={handleMultiSelect} />
      <Main5
        onReset={handleReset}
        onRecommend={() => console.log("AI 추천 화면으로 이동!")}
      />
    </div>
  );
};

export default MainAll;
