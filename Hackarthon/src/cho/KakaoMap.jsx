import React, { useEffect, useRef } from "react";

const KakaoMap = ({
  courses,
  parkingData,
  showParking,
  onPinClick,
  activePlace,
  recommendedRoute,
  onParkingListUpdate,
  selectedParkingId, // 새로 추가: 선택된 주차장 ID
}) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const parkingMarkersRef = useRef([]);
  const polylineRef = useRef(null);
  const placesServiceRef = useRef(null);
  const searchedParkingRef = useRef([]);

  // 지도 초기화 및 마커 생성
  useEffect(() => {
    const initializeMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error("카카오맵 API가 로드되지 않았습니다.");
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

      // Places 서비스 초기화 (주차장 검색용)
      if (window.kakao.maps.services && window.kakao.maps.services.Places) {
        placesServiceRef.current = new window.kakao.maps.services.Places();
        console.log("Places 서비스 초기화 완료");
      } else {
        console.error(
          "Places 서비스를 사용할 수 없습니다. libraries=services가 포함되어 있는지 확인하세요."
        );
        console.log("사용 가능한 kakao.maps:", Object.keys(window.kakao.maps));
      }

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
      const checkKakao = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(checkKakao);
          initializeMap();
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkKakao);
        if (!window.kakao || !window.kakao.maps) {
          console.error("카카오맵 API 로드 시간 초과.");
        }
      }, 5000);
    }
  }, [courses, recommendedRoute, onPinClick]);

  // 주변 주차장 검색 함수
  const searchNearbyParking = (centerPosition, radius = 1000) => {
    if (!placesServiceRef.current) {
      console.log("Places 서비스가 초기화되지 않았습니다.");
      return;
    }

    const options = {
      location: centerPosition,
      radius: radius,
      sort: window.kakao.maps.services.SortBy.DISTANCE,
    };

    placesServiceRef.current.keywordSearch(
      "주차장",
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          console.log(`주변 주차장 ${data.length}개 검색됨:`, data);

          // 검색된 주차장 데이터 저장
          searchedParkingRef.current = data.map((place) => ({
            id: place.id,
            name: place.place_name,
            latitude: parseFloat(place.y),
            longitude: parseFloat(place.x),
            address: place.address_name,
            phone: place.phone,
            distance: place.distance,
          }));

          // 부모 컴포넌트에 주차장 목록 전달
          if (onParkingListUpdate) {
            onParkingListUpdate(searchedParkingRef.current);
          }

          // showParking이 true면 바로 표시
          if (showParking) {
            displaySearchedParking();
          }
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          console.log("검색된 주차장이 없습니다.");
        } else {
          console.error("주차장 검색 실패:", status);
        }
      },
      options
    );
  };

  // 검색된 주차장 마커 표시
  const displaySearchedParking = (filteredParkingList = null) => {
    if (!mapRef.current) return;

    // 기존 검색된 주차장 마커 제거
    parkingMarkersRef.current.forEach((marker) => {
      if (marker.setMap) {
        marker.setMap(null);
      }
    });
    parkingMarkersRef.current = [];

    // 표시할 주차장 목록 결정 (필터링된 목록이 있으면 사용, 없으면 전체)
    const parkingToShow = filteredParkingList || searchedParkingRef.current;

    // 검색된 주차장 마커 생성
    parkingToShow.forEach((parking, index) => {
      const position = new window.kakao.maps.LatLng(
        parking.latitude,
        parking.longitude
      );

      // 선택된 주차장인지 확인
      const isSelected = selectedParkingId === parking.id;

      const parkingMarkerContent = document.createElement("div");
      parkingMarkerContent.style.cssText = `
        background: ${isSelected ? "#ff4757" : "#4285f4"}; 
        border: 2px solid white;
        border-radius: 6px; 
        width: ${isSelected ? "32px" : "28px"}; 
        height: ${isSelected ? "32px" : "28px"}; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        color: white; 
        font-weight: bold;
        font-size: ${isSelected ? "14px" : "12px"};
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transition: transform 0.2s ease;
        ${isSelected ? "z-index: 100;" : ""}
      `;
      parkingMarkerContent.textContent = "P";
      parkingMarkerContent.title = parking.name;

      // 호버 효과
      parkingMarkerContent.addEventListener("mouseenter", () => {
        parkingMarkerContent.style.transform = "scale(1.2)";
      });
      parkingMarkerContent.addEventListener("mouseleave", () => {
        parkingMarkerContent.style.transform = "scale(1)";
      });

      // 클릭 시 인포윈도우 표시
      parkingMarkerContent.addEventListener("click", () => {
        const infoContent = `
          <div style="padding:15px;min-width:200px;font-family:Arial,sans-serif;">
            <h4 style="margin:0 0 10px 0;color:#333;font-size:14px;">🅿️ ${
              parking.name
            }</h4>
            <p style="margin:5px 0;font-size:12px;color:#666;">📍 ${
              parking.address
            }</p>
            ${
              parking.phone
                ? `<p style="margin:5px 0;font-size:12px;color:#4a90e2;">📞 ${parking.phone}</p>`
                : ""
            }
            <p style="margin:5px 0;font-size:11px;color:#888;">🚶‍♂️ 거리: 약 ${
              parking.distance
            }m</p>
          </div>
        `;

        const infoWindow = new window.kakao.maps.InfoWindow({
          content: infoContent,
          removable: true,
        });

        infoWindow.open(mapRef.current, {
          getPosition: () => position,
        });
      });

      const parkingOverlay = new window.kakao.maps.CustomOverlay({
        content: parkingMarkerContent,
        position: position,
        yAnchor: 0.5,
        xAnchor: 0.5,
        zIndex: isSelected ? 100 : 2,
      });

      parkingOverlay.setMap(mapRef.current);
      parkingMarkersRef.current.push(parkingOverlay);
    });

    console.log(`${parkingToShow.length}개의 주차장 마커가 표시되었습니다.`);
  };

  // 코스 데이터가 변경될 때 주변 주차장 검색
  useEffect(() => {
    if (!mapRef.current || !courses || courses.length === 0) return;

    // Places 서비스가 사용 가능한지 확인
    if (!placesServiceRef.current) {
      console.log("Places 서비스가 없어 주차장 검색을 건너뜁니다.");
      return;
    }

    // 모든 코스의 중심점 계산
    const validCourses = courses.filter(
      (course) =>
        course.latitude !== undefined &&
        course.longitude !== undefined &&
        !isNaN(parseFloat(course.latitude)) &&
        !isNaN(parseFloat(course.longitude))
    );

    if (validCourses.length === 0) return;

    // 모든 코스의 평균 위치를 중심점으로 설정
    const avgLat =
      validCourses.reduce(
        (sum, course) => sum + parseFloat(course.latitude),
        0
      ) / validCourses.length;
    const avgLng =
      validCourses.reduce(
        (sum, course) => sum + parseFloat(course.longitude),
        0
      ) / validCourses.length;

    const centerPosition = new window.kakao.maps.LatLng(avgLat, avgLng);

    // 주변 주차장 검색 (반경 2km)
    searchNearbyParking(centerPosition, 2000);
  }, [courses]);

  // 주차장 표시/숨기기 처리
  useEffect(() => {
    if (!mapRef.current) return;

    if (showParking) {
      // 선택된 주차장이 있으면 해당 주차장만, 없으면 전체 표시
      let filteredParking = null;
      if (selectedParkingId) {
        filteredParking = searchedParkingRef.current.filter(
          (parking) => parking.id === selectedParkingId
        );
        console.log("선택된 주차장 표시:", filteredParking);

        // 선택된 주차장으로 지도 중심 이동
        if (filteredParking.length > 0) {
          const selectedParking = filteredParking[0];
          const position = new window.kakao.maps.LatLng(
            selectedParking.latitude,
            selectedParking.longitude
          );
          mapRef.current.panTo(position);
          mapRef.current.setLevel(3); // 확대
        }
      } else {
        console.log("전체 주차장 표시");
      }

      // 검색된 주차장 표시
      displaySearchedParking(filteredParking);

      // 기존 parkingData도 표시 (있다면)
      if (parkingData && parkingData.length > 0) {
        parkingData.forEach((parking) => {
          if (parking.latitude && parking.longitude) {
            const position = new window.kakao.maps.LatLng(
              parseFloat(parking.latitude),
              parseFloat(parking.longitude)
            );

            const parkingMarkerContent = document.createElement("div");
            parkingMarkerContent.style.cssText = `
              background: #ff9500; 
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
    } else {
      // 주차장 마커 숨기기
      parkingMarkersRef.current.forEach((marker) => {
        if (marker.setMap) {
          marker.setMap(null);
        }
      });
      parkingMarkersRef.current = [];
    }
  }, [showParking, parkingData, selectedParkingId]);

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
