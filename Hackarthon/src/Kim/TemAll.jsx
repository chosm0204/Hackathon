import React from "react";
import { useLocation } from "react-router-dom";
import Temporarily from "./Temporarily";
import Departure from "./Departure";

const TemAll = () => {
  const location = useLocation();

  // 🔍 디버깅: 받은 데이터 상세 확인
  console.log("🔍 TemAll - location.state:", location.state);

  const apiResult = location.state?.result;
  const selectedStation = location.state?.selectedStation || "출발지";
  const directCourses = location.state?.courses;

  // 🔍 API 응답 구조 상세 분석
  if (apiResult) {
    // API 응답의 rating 정보 확인을 위한 디버깅
    if (apiResult.recommendedPlaces?.length > 0) {
      console.log("🔍 첫 번째 recommendedPlace의 rating 관련 정보:");
      const firstPlace = apiResult.recommendedPlaces[0];
      console.log("- rating:", firstPlace.rating);
    }
  }

  let courses = directCourses;

  if (!courses && apiResult) {
    let rawData = [];

    if (
      apiResult.recommendedPlaces &&
      Array.isArray(apiResult.recommendedPlaces) &&
      apiResult.recommendedPlaces.length > 0
    ) {
      rawData = apiResult.recommendedPlaces;
      console.log("rawData", rawData);
    } else if (
      apiResult.recommendedPlaces &&
      Array.isArray(apiResult.recommendedPlaces) &&
      apiResult.recommendedPlaces.length > 0
    ) {
      rawData = apiResult.recommendedPlaces;
    }

    const getCategoryFromItem = (item) => {
      const categoryMapping = {
        RESTAURANT: "맛집",
        CAFE: "카페",
        MOVIE: "영화관",
        MOVIE_THEATER: "영화관",
        TOURIST_ATTRACTION: "관광지",
        ATTRACTION: "관광지",
        PARK: "공원",
        SHOPPING_MALL: "쇼핑",
        SHOPPING: "쇼핑",
        ENTERTAINMENT: "오락",
        CULTURE: "문화시설",
        CULTURAL: "문화시설",
        HOSPITAL: "병원",
        SCHOOL: "교육시설",
        LODGING: "숙박",
        HOTEL: "숙박",
        맛집: "맛집",
        카페: "카페",
        영화관: "영화관",
        관광지: "관광지",
        공원: "공원",
        쇼핑: "쇼핑",
        오락: "오락",
        문화시설: "문화시설",
        병원: "병원",
        교육시설: "교육시설",
        숙박: "숙박",
        GAS_STATION: "주유소",
        ATM: "ATM",
        BANK: "은행",
        BEAUTY_SALON: "미용실",
        CLOTHING_STORE: "옷가게",
        CONVENIENCE_STORE: "편의점",
        DEPARTMENT_STORE: "백화점",
        GROCERY_OR_SUPERMARKET: "마트",
        PHARMACY: "약국",
        SUBWAY_STATION: "지하철역",
        restaurant: "맛집",
        cafe: "카페",
        movie: "영화관",
        tourist_attraction: "관광지",
        park: "공원",
        shopping_mall: "쇼핑",
        entertainment: "오락",
        culture: "문화시설",
      };

      const possibleCategoryFields = [
        "category",
        "categoryName",
        "type",
        "placeType",
        "kind",
        "genre",
        "classification",
        "place_type",
        "types",
      ];

      for (const field of possibleCategoryFields) {
        const fieldValue = item[field];
        if (fieldValue) {
          if (typeof fieldValue === "string" && fieldValue.trim() !== "") {
            const normalizedValue = fieldValue.trim();
            const mappedCategory =
              categoryMapping[normalizedValue] ||
              categoryMapping[normalizedValue.toUpperCase()] ||
              categoryMapping[normalizedValue.toLowerCase()];
            if (mappedCategory) {
              return mappedCategory;
            }
            return normalizedValue;
          } else if (Array.isArray(fieldValue) && fieldValue.length > 0) {
            for (const type of fieldValue) {
              if (typeof type === "string") {
                const mappedCategory =
                  categoryMapping[type] ||
                  categoryMapping[type.toUpperCase()] ||
                  categoryMapping[type.toLowerCase()];
                if (mappedCategory) {
                  return mappedCategory;
                }
              }
            }
            const firstType = fieldValue[0];
            if (typeof firstType === "string") {
              return firstType;
            }
          }
        }
      }

      const name = item.name || item.place_name || "";
      if (name) {
        const nameKeywords = {
          카페: ["카페", "Coffee", "커피", "Cafe"],
          맛집: [
            "식당",
            "Restaurant",
            "음식",
            "레스토랑",
            "치킨",
            "피자",
            "한식",
            "중식",
            "일식",
            "양식",
          ],
          영화관: ["영화관", "Cinema", "CGV", "롯데시네마", "메가박스"],
          관광지: [
            "박물관",
            "미술관",
            "타워",
            "궁",
            "공원",
            "Museum",
            "Gallery",
            "Tower",
            "Palace",
          ],
          쇼핑: [
            "백화점",
            "마트",
            "쇼핑",
            "Shopping",
            "Mall",
            "Store",
            "편의점",
          ],
        };

        for (const [category, keywords] of Object.entries(nameKeywords)) {
          for (const keyword of keywords) {
            if (name.includes(keyword)) {
              return category;
            }
          }
        }
      }

      return "기타";
    };

    const getAddressFromItem = (item) => {
      // recommendedPlaces에는 address가 있음
      if (
        item.address &&
        typeof item.address === "string" &&
        item.address.trim() !== ""
      ) {
        return item.address.trim();
      }

      // 혹시 다른 API 응답에서 다른 필드로 올 수도 있으니 후보 필드 몇 개만 확인
      const possibleAddressFields = [
        "formatted_address",
        "vicinity",
        "place_address",
      ];
      for (const field of possibleAddressFields) {
        if (
          item[field] &&
          typeof item[field] === "string" &&
          item[field].trim() !== ""
        ) {
          return item[field].trim();
        }
      }

      // 주소가 아예 없는 optimizedRoute 같은 경우
      return "주소 정보 없음";
    };

    const getRatingFromItem = (item) => {
      console.log(`🔍 getRatingFromItem 호출 - 아이템:`, item);

      // 다양한 rating 필드명들을 시도
      const possibleRatingFields = [
        "rating",
        "rate",
        "score",
        "review_score",
        "user_ratings_total",
        "stars",
        "point",
        "grade",
        "evaluation",
        "review_rating",
        "average_rating",
      ];

      for (const field of possibleRatingFields) {
        const fieldValue = item[field];

        if (
          fieldValue !== undefined &&
          fieldValue !== null &&
          fieldValue !== ""
        ) {
          console.log(`🔍 Rating 필드 발견: ${field} = ${fieldValue}`);

          // 숫자로 변환 시도
          const numericValue = parseFloat(fieldValue);

          if (!isNaN(numericValue) && numericValue > 0) {
            // rating 값이 5점 만점이 아닌 경우 (예: 10점 만점) 5점 만점으로 변환
            if (numericValue > 5) {
              const convertedValue = (numericValue / 10) * 5;
              console.log(
                `✅ Rating 변환됨: ${numericValue} -> ${convertedValue.toFixed(
                  1
                )}`
              );
              return parseFloat(convertedValue.toFixed(1));
            }

            console.log(`✅ Rating 사용됨: ${numericValue}`);
            return numericValue;
          }
        }
      }

      // nested object에서 rating 찾기
      if (item.details && typeof item.details === "object") {
        for (const field of possibleRatingFields) {
          const fieldValue = item.details[field];
          if (
            fieldValue !== undefined &&
            fieldValue !== null &&
            fieldValue !== ""
          ) {
            const numericValue = parseFloat(fieldValue);
            if (!isNaN(numericValue) && numericValue > 0) {
              console.log(
                `✅ Nested Rating 발견: details.${field} = ${numericValue}`
              );
              return numericValue > 5
                ? parseFloat(((numericValue / 10) * 5).toFixed(1))
                : numericValue;
            }
          }
        }
      }

      // review 관련 객체에서 찾기
      if (item.reviews && typeof item.reviews === "object") {
        const reviewRating =
          item.reviews.rating || item.reviews.average || item.reviews.score;
        if (reviewRating !== undefined && reviewRating !== null) {
          const numericValue = parseFloat(reviewRating);
          if (!isNaN(numericValue) && numericValue > 0) {
            console.log(`✅ Review Rating 발견: ${numericValue}`);
            return numericValue > 5
              ? parseFloat(((numericValue / 10) * 5).toFixed(1))
              : numericValue;
          }
        }
      }

      console.warn(
        `⚠️ ${item.name || "Unknown"}: rating 값을 찾을 수 없어 기본값 사용`
      );
      return 4.0;
    };

    const getNameFromItem = (item) => {
      const possibleNameFields = [
        "name",
        "place_name",
        "title",
        "business_name",
        "establishment",
        "place_title",
      ];
      for (const field of possibleNameFields) {
        const fieldValue = item[field];
        if (
          fieldValue &&
          typeof fieldValue === "string" &&
          fieldValue.trim() !== ""
        ) {
          const name = fieldValue.trim();
          return name;
        }
      }
      return `장소 ${Date.now()}`;
    };

    const getCoordinatesFromItem = (item) => {
      console.log(`🔍 getCoordinatesFromItem 호출 - 아이템:`, item);

      // 다양한 좌표 필드명들을 시도
      const possibleCoordinateFields = [
        // 일반적인 필드명들
        { lat: "latitude", lng: "longitude" },
        { lat: "lat", lng: "lng" },
        { lat: "lat", lng: "lon" },
        { lat: "y", lng: "x" }, // 카카오 API 스타일

        // 객체 형태로 저장된 경우
        "coordinates",
        "location",
        "position",
        "geometry",
        "coord",
        "latlng",
        "point",
      ];

      // 직접 필드에서 찾기
      for (const coordField of possibleCoordinateFields) {
        if (typeof coordField === "object") {
          const latValue = item[coordField.lat];
          const lngValue = item[coordField.lng];

          if (
            latValue !== undefined &&
            lngValue !== undefined &&
            latValue !== null &&
            lngValue !== null &&
            latValue !== "" &&
            lngValue !== ""
          ) {
            const lat = parseFloat(latValue);
            const lng = parseFloat(lngValue);

            if (
              !isNaN(lat) &&
              !isNaN(lng) &&
              lat >= -90 &&
              lat <= 90 &&
              lng >= -180 &&
              lng <= 180
            ) {
              console.log(
                `✅ 좌표 발견: ${coordField.lat}=${lat}, ${coordField.lng}=${lng}`
              );
              return { latitude: lat, longitude: lng };
            }
          }
        }
      }

      // 객체 형태로 저장된 좌표 찾기
      const objectFields = [
        "coordinates",
        "location",
        "position",
        "geometry",
        "coord",
        "latlng",
        "point",
      ];

      for (const field of objectFields) {
        const coordObj = item[field];
        if (coordObj && typeof coordObj === "object") {
          // 다양한 형태의 객체 구조 체크
          const coordPatterns = [
            { lat: "latitude", lng: "longitude" },
            { lat: "lat", lng: "lng" },
            { lat: "lat", lng: "lon" },
            { lat: "y", lng: "x" },
          ];

          for (const pattern of coordPatterns) {
            const latValue = coordObj[pattern.lat];
            const lngValue = coordObj[pattern.lng];

            if (
              latValue !== undefined &&
              lngValue !== undefined &&
              latValue !== null &&
              lngValue !== null
            ) {
              const lat = parseFloat(latValue);
              const lng = parseFloat(lngValue);

              if (
                !isNaN(lat) &&
                !isNaN(lng) &&
                lat >= -90 &&
                lat <= 90 &&
                lng >= -180 &&
                lng <= 180
              ) {
                console.log(
                  `✅ 객체 좌표 발견: ${field}.${pattern.lat}=${lat}, ${field}.${pattern.lng}=${lng}`
                );
                return { latitude: lat, longitude: lng };
              }
            }
          }

          // 배열 형태로 저장된 경우 [lng, lat] 또는 [lat, lng]
          if (Array.isArray(coordObj) && coordObj.length >= 2) {
            const val1 = parseFloat(coordObj[0]);
            const val2 = parseFloat(coordObj[1]);

            if (!isNaN(val1) && !isNaN(val2)) {
              // 일반적으로 [lng, lat] 순서 (GeoJSON 표준)
              if (val1 >= -180 && val1 <= 180 && val2 >= -90 && val2 <= 90) {
                console.log(`✅ 배열 좌표 발견 [lng, lat]: [${val1}, ${val2}]`);
                return { latitude: val2, longitude: val1 };
              }
              // [lat, lng] 순서인 경우
              else if (
                val1 >= -90 &&
                val1 <= 90 &&
                val2 >= -180 &&
                val2 <= 180
              ) {
                console.log(`✅ 배열 좌표 발견 [lat, lng]: [${val1}, ${val2}]`);
                return { latitude: val1, longitude: val2 };
              }
            }
          }
        }
      }

      // nested objects에서 찾기
      const nestedFields = [
        "details",
        "properties",
        "attributes",
        "data",
        "info",
      ];

      for (const nestedField of nestedFields) {
        const nestedObj = item[nestedField];
        if (nestedObj && typeof nestedObj === "object") {
          const nestedResult = getCoordinatesFromItem(nestedObj);
          if (
            nestedResult.latitude !== null &&
            nestedResult.longitude !== null
          ) {
            console.log(`✅ Nested 좌표 발견: ${nestedField}`);
            return nestedResult;
          }
        }
      }

      // 문자열로 저장된 좌표 파싱 시도
      const stringFields = [
        "coord_string",
        "location_string",
        "coordinates_string",
      ];

      for (const field of stringFields) {
        const coordString = item[field];
        if (coordString && typeof coordString === "string") {
          // "lat,lng" 또는 "lat lng" 형태
          const parts = coordString.split(/[,\s]+/);
          if (parts.length >= 2) {
            const lat = parseFloat(parts[0]);
            const lng = parseFloat(parts[1]);

            if (
              !isNaN(lat) &&
              !isNaN(lng) &&
              lat >= -90 &&
              lat <= 90 &&
              lng >= -180 &&
              lng <= 180
            ) {
              console.log(`✅ 문자열 좌표 발견: ${coordString}`);
              return { latitude: lat, longitude: lng };
            }
          }
        }
      }

      console.warn(
        `⚠️ ${item.name || "Unknown"}: 좌표 값을 찾을 수 없어 기본값 사용`
      );

      return {
        latitude: null,
        longitude: null,
      };
    };

    const getDescription = (item, category) => {
      return `${category} 장소입니다`;
    };

    courses = rawData.map((item, index) => {
      const name = getNameFromItem(item);
      const category = getCategoryFromItem(item);
      const address = getAddressFromItem(item);
      const rating = getRatingFromItem(item);
      const coords = getCoordinatesFromItem(item);
      const description = getDescription(item, category);

      const mappedItem = {
        id: index + 1,
        name: name,
        title: name,
        category: category,
        type: category,
        description: description,
        address: address,
        rating: rating,
        latitude: coords.latitude,
        longitude: coords.longitude,
        parking: item.parking || item.parkingInfo || "주차 정보 확인 필요",
        image:
          item.imageUrl ||
          item.image ||
          item.photo ||
          item.thumbnail ||
          item.icon ||
          null,
        placeId: item.placeId || item.place_id || item.id,
        duration: "10분",
      };

      console.log(`📍 매핑된 장소 ${index + 1}: ${name}, Rating: ${rating}`);
      return mappedItem;
    });

    console.log("✅ 최종 매핑된 courses:", courses);
  }

  const parkingData = apiResult?.parkingSpaces || [];

  // 데이터가 없을 때 더 상세한 디버그 정보 제공

  if (!courses || courses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-2xl">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">
            ⚠️ 코스 데이터가 비어있습니다
          </h2>
          <p className="text-gray-600 mb-4">
            API 응답은 받았지만 코스 데이터를 찾을 수 없습니다.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/")}
              className="px-6 py-2 bg-[#E387A1] text-white rounded-lg hover:bg-[#d17696] transition-colors"
            >
              메인으로 돌아가기
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              새로고침
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-36">
      <img
        src="/img/map.png"
        alt="배경 지도"
        className="fixed inset-0 w-full h-full object-cover -z-10 opacity-40"
      />
      <div className="fixed inset-0 bg-white/30 backdrop-blur-[5px] -z-10" />

      {/* ✅ Departure 컴포넌트 */}
      <Departure stationName={selectedStation} />

      {/* ✅ Temporarily 컴포넌트 */}
      <Temporarily courses={courses} parkingData={parkingData} />
    </div>
  );
};

export default TemAll;
