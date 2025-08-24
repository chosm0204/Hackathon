import React, { useEffect, useRef } from "react";

const KakaoMap = ({
  courses,
  parkingData,
  showParking,
  onPinClick,
  activePlace,
  recommendedRoute,
}) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const parkingMarkersRef = useRef([]);
  const polylineRef = useRef(null);

  // 지도 초기화 및 마커 생성
  useEffect(() => {
    // 카카오맵 API 로드 대기
    const initializeMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error(
          "카카오맵 API가 로드되지 않았습니다. public/index.html에 스크립트를 추가했는지 확인하세요."
        );
        return;
      }

      if (!mapContainer.current) {
        console.error("맵 컨테이너를 찾을 수 없습니다.");
        return;
      }

      console.log("지도 초기화 시작, courses:", courses);

      // 지도 생성
      const options = {
        center: new window.kakao.maps.LatLng(37.3943, 126.9568), // 안양시 중심좌표
        level: 5,
      };

      const map = new window.kakao.maps.Map(mapContainer.current, options);
      mapRef.current = map;

      // 기존 마커들 제거
      markersRef.current.forEach((marker) => {
        if (marker.setMap) {
          marker.setMap(null);
        }
      });
      markersRef.current = [];

      // 기존 경로선 제거
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }

      // 코스 마커 생성
      if (courses && courses.length > 0) {
        const bounds = new window.kakao.maps.LatLngBounds();
        const validCourses = courses.filter(
          (course) =>
            course.latitude !== undefined &&
            course.longitude !== undefined &&
            !isNaN(parseFloat(course.latitude)) &&
            !isNaN(parseFloat(course.longitude))
        );

        console.log("유효한 코스:", validCourses);

        if (validCourses.length === 0) {
          console.warn("유효한 좌표를 가진 코스가 없습니다.");
          return;
        }

        validCourses.forEach((course, index) => {
          const lat = parseFloat(course.latitude);
          const lng = parseFloat(course.longitude);

          console.log(`코스 ${index + 1}: ${course.name} (${lat}, ${lng})`);

          const position = new window.kakao.maps.LatLng(lat, lng);
          bounds.extend(position);

          // 커스텀 마커 HTML
          const markerContent = document.createElement("div");
          markerContent.style.cssText = `
            background: #E387A1; 
            border: 2px solid white;
            border-radius: 50%; 
            width: 35px; 
            height: 35px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: white; 
            font-weight: bold;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 3px 6px rgba(0,0,0,0.3);
            transition: transform 0.2s ease;
            z-index: 10;
          `;
          markerContent.textContent = index + 1;

          // 호버 효과
          markerContent.addEventListener("mouseenter", () => {
            markerContent.style.transform = "scale(1.1)";
          });
          markerContent.addEventListener("mouseleave", () => {
            markerContent.style.transform = "scale(1)";
          });

          // 클릭 이벤트
          markerContent.addEventListener("click", () => {
            console.log("마커 클릭:", course);
            if (onPinClick) {
              onPinClick(course.id);
            }
          });

          const customOverlay = new window.kakao.maps.CustomOverlay({
            content: markerContent,
            position: position,
            yAnchor: 0.5,
            xAnchor: 0.5,
            zIndex: 3,
          });

          customOverlay.setMap(map);
          markersRef.current.push(customOverlay);
        });

        // 지도 범위 조정 (모든 마커가 보이도록)
        if (validCourses.length > 0) {
          map.setBounds(bounds);
          // 너무 확대되는 것을 방지
          setTimeout(() => {
            if (map.getLevel() < 3) {
              map.setLevel(3);
            }
          }, 100);
        }

        // 경로선 그리기 (recommendedRoute가 true일 때)
        if (recommendedRoute && validCourses.length > 1) {
          const linePath = validCourses.map(
            (course) =>
              new window.kakao.maps.LatLng(
                parseFloat(course.latitude),
                parseFloat(course.longitude)
              )
          );

          const polyline = new window.kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 4,
            strokeColor: "#E387A1",
            strokeOpacity: 0.8,
            strokeStyle: "solid",
          });

          polyline.setMap(map);
          polylineRef.current = polyline;
          console.log("경로선 생성됨");
        }
      }
    };

    // 카카오맵 API가 로드될 때까지 대기
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    } else {
      // API가 아직 로드되지 않았다면 잠시 후 다시 시도
      const checkKakao = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(checkKakao);
          initializeMap();
        }
      }, 100);

      // 5초 후에도 로드되지 않으면 포기
      setTimeout(() => {
        clearInterval(checkKakao);
        if (!window.kakao || !window.kakao.maps) {
          console.error(
            "카카오맵 API 로드 시간 초과. public/index.html에 스크립트가 올바르게 추가되었는지 확인하세요."
          );
        }
      }, 5000);
    }
  }, [courses, recommendedRoute, onPinClick]);

  // 주차장 마커 처리
  useEffect(() => {
    if (!mapRef.current || !window.kakao || !window.kakao.maps) return;

    // 기존 주차장 마커들 제거
    parkingMarkersRef.current.forEach((marker) => {
      if (marker.setMap) {
        marker.setMap(null);
      }
    });
    parkingMarkersRef.current = [];

    if (showParking && parkingData && parkingData.length > 0) {
      console.log("주차장 데이터:", parkingData);

      parkingData.forEach((parking) => {
        if (parking.latitude && parking.longitude) {
          const position = new window.kakao.maps.LatLng(
            parseFloat(parking.latitude),
            parseFloat(parking.longitude)
          );

          const parkingMarkerContent = document.createElement("div");
          parkingMarkerContent.style.cssText = `
            background: #4285f4; 
            border: 2px solid white;
            border-radius: 6px; 
            width: 28px; 
            height: 28px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: white; 
            font-weight: bold;
            font-size: 12px;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          `;
          parkingMarkerContent.textContent = "P";
          parkingMarkerContent.title = parking.name || "주차장";

          const parkingOverlay = new window.kakao.maps.CustomOverlay({
            content: parkingMarkerContent,
            position: position,
            yAnchor: 0.5,
            xAnchor: 0.5,
            zIndex: 2,
          });

          parkingOverlay.setMap(mapRef.current);
          parkingMarkersRef.current.push(parkingOverlay);
        }
      });
    }
  }, [showParking, parkingData]);

  // 활성 장소 하이라이트
  useEffect(() => {
    if (!activePlace || !mapRef.current || !window.kakao || !window.kakao.maps)
      return;

    // 활성 장소로 지도 중심 이동
    if (activePlace.latitude && activePlace.longitude) {
      const position = new window.kakao.maps.LatLng(
        parseFloat(activePlace.latitude),
        parseFloat(activePlace.longitude)
      );
      mapRef.current.panTo(position);
    }
  }, [activePlace]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "500px",
        backgroundColor: "#f8f9fa",
      }}
    />
  );
};

export default KakaoMap;
