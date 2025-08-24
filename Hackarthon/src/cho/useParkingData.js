// useParkingData.js
import { useState, useEffect } from "react";
import axios from "axios";

const useParkingData = (courses) => {
  const [parkingData, setParkingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchParkingData = async () => {
    if (!courses || courses.length === 0) return;

    setLoading(true);
    try {
      // 첫 번째 장소의 좌표를 기준으로 주차장 검색
      const firstPlace = courses[0];
      const response = await axios.post(
        "http://43.203.141.38:8080/api/places/parking/search",
        {
          lat: firstPlace.latitude || 37.4043,
          lng: firstPlace.longitude || 126.9527,
          radius: 2000,
          limit: 10,
          language: "ko",
          rankPreference: "distance",
        }
      );

      const processedParkingData =
        response.data?.map((parking, index) => ({
          id: parking.id || index,
          name: parking.name,
          address: parking.address,
          lat: parking.lat,
          lng: parking.lng,
          // 간단한 좌표 변환
          top: 300 + (37.4 - parking.lat) * 5000,
          left: 400 + (parking.lng - 126.9) * 5000,
        })) || [];

      setParkingData(processedParkingData);
    } catch (error) {
      console.error("주차장 데이터 로딩 실패:", error);
      setParkingData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParkingData();
  }, [courses]);

  return { parkingData, loading, refetch: fetchParkingData };
};

export default useParkingData;
