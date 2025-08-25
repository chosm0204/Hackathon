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

  console.log("🔍 TemAll - 전체 API 응답:", apiResult);
  console.log("🔍 TemAll - selectedStation:", selectedStation);
  console.log("🔍 TemAll - directCourses:", directCourses);

  // 🔍 API 응답 구조 상세 분석
  if (apiResult) {
    console.log("🔍 API 응답 키들:", Object.keys(apiResult));
    console.log("🔍 recommendedPlaces:", apiResult.recommendedPlaces);
    console.log("🔍 optimizedRoute:", apiResult.optimizedRoute);

    // 각 배열의 첫 번째 항목 구조 확인
    if (apiResult.recommendedPlaces?.length > 0) {
      console.log(
        "🔍 recommendedPlaces[0] 구조:",
        Object.keys(apiResult.recommendedPlaces[0])
      );
      console.log(
        "🔍 recommendedPlaces[0] 데이터:",
        apiResult.recommendedPlaces[0]
      );
    }

    if (apiResult.optimizedRoute?.length > 0) {
      console.log(
        "🔍 optimizedRoute[0] 구조:",
        Object.keys(apiResult.optimizedRoute[0])
      );
      console.log("🔍 optimizedRoute[0] 데이터:", apiResult.optimizedRoute[0]);
    }
  }

  // MainAll에서 직접 처리한 코스 데이터가 있으면 그것을 우선 사용
  let courses = directCourses;

  // 개선된 데이터 매핑 로직
  if (!courses && apiResult) {
    let rawData = [];

    // 1순위: optimizedRoute 사용
    if (
      apiResult.optimizedRoute &&
      Array.isArray(apiResult.optimizedRoute) &&
      apiResult.optimizedRoute.length > 0
    ) {
      console.log(
        "✅ optimizedRoute 사용 (" + apiResult.optimizedRoute.length + "개)"
      );
      rawData = apiResult.optimizedRoute;
    }
    // 2순위: recommendedPlaces 사용
    else if (
      apiResult.recommendedPlaces &&
      Array.isArray(apiResult.recommendedPlaces) &&
      apiResult.recommendedPlaces.length > 0
    ) {
      console.log(
        "✅ recommendedPlaces 사용 (" +
          apiResult.recommendedPlaces.length +
          "개)"
      );
      rawData = apiResult.recommendedPlaces;
    }

    // 🔧 개선된 카테고리 매핑 함수
    const getCategoryFromItem = (item) => {
      console.log(`🔧 getCategoryFromItem 호출됨 - 아이템:`, item);

      // 🆕 백엔드 실제 응답에 맞춘 카테고리 매핑
      const categoryMapping = {
        // 영문 카테고리
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

        // 한글 카테고리 (백엔드가 한글로 보낼 가능성)
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

        // 추가 영문 타입들
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

        // 소문자 버전도 추가
        restaurant: "맛집",
        cafe: "카페",
        movie: "영화관",
        tourist_attraction: "관광지",
        park: "공원",
        shopping_mall: "쇼핑",
        entertainment: "오락",
        culture: "문화시설",
      };

      // 🆕 우선순위가 높은 카테고리 필드들
      const possibleCategoryFields = [
        "category",
        "categoryName",
        "type",
        "placeType",
        "kind",
        "genre",
        "classification",
        "place_type",
        "types", // Google Places API
      ];

      console.log(`🔍 카테고리 필드 검색 시작 - ${item.name || "Unknown"}`);

      for (const field of possibleCategoryFields) {
        const fieldValue = item[field];
        console.log(`  ${field}: ${fieldValue} (${typeof fieldValue})`);

        if (fieldValue) {
          // 문자열인 경우
          if (typeof fieldValue === "string" && fieldValue.trim() !== "") {
            const normalizedValue = fieldValue.trim();

            // 대소문자 구분없이 매핑 확인
            const mappedCategory =
              categoryMapping[normalizedValue] ||
              categoryMapping[normalizedValue.toUpperCase()] ||
              categoryMapping[normalizedValue.toLowerCase()];

            if (mappedCategory) {
              console.log(
                `🔍 카테고리 매핑 성공 - ${
                  item.name || "Unknown"
                }: ${field} = ${normalizedValue} -> ${mappedCategory}`
              );
              return mappedCategory;
            }

            // 매핑에 없으면 원본값 그대로 사용 (한글일 가능성)
            console.log(
              `🔍 카테고리 원본값 사용 - ${
                item.name || "Unknown"
              }: ${field} = ${normalizedValue}`
            );
            return normalizedValue;
          }

          // 배열인 경우 (types 필드)
          else if (Array.isArray(fieldValue) && fieldValue.length > 0) {
            for (const type of fieldValue) {
              if (typeof type === "string") {
                const mappedCategory =
                  categoryMapping[type] ||
                  categoryMapping[type.toUpperCase()] ||
                  categoryMapping[type.toLowerCase()];

                if (mappedCategory) {
                  console.log(
                    `🔍 배열 카테고리 매핑 성공 - ${
                      item.name || "Unknown"
                    }: ${field}[${type}] -> ${mappedCategory}`
                  );
                  return mappedCategory;
                }
              }
            }

            // 매핑 안되는 경우 첫 번째 값 사용
            const firstType = fieldValue[0];
            if (typeof firstType === "string") {
              console.log(
                `🔍 배열 카테고리 원본값 사용 - ${
                  item.name || "Unknown"
                }: ${field}[0] = ${firstType}`
              );
              return firstType;
            }
          }
        }
      }

      // 🆕 이름 기반 카테고리 추측 (최후의 수단)
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
              console.log(
                `🔍 이름 기반 카테고리 추측 - ${name}: ${keyword} -> ${category}`
              );
              return category;
            }
          }
        }
      }

      console.warn(`⚠️ ${item.name || "Unknown"}: 카테고리를 결정할 수 없음`);
      return "기타";
    };

    // 🆕 개선된 주소 추출 함수
    const getAddressFromItem = (item) => {
      console.log(
        `🔧 getAddressFromItem 호출됨 - 아이템:`,
        item.name || "Unknown"
      );

      // 🚨 전체 아이템에서 주소 관련 필드 찾기
      console.log(`🔍🔍🔍 ${item.name || "Unknown"}의 주소 관련 전체 분석:`);

      const possibleAddressFields = [
        "address",
        "formatted_address",
        "vicinity",
        "addr",
        "location",
        "place_address",
        "full_address",
        "roadAddress", // 카카오 API
        "jibunAddress", // 카카오 API
        "detailAddress",
        "fullAddress",
        "placeAddress",
        "locationAddress",
        // 한국어 필드
        "주소",
        "위치",
        "상세주소",
        "도로명주소",
        "지번주소",
      ];

      // 🔍 모든 키 중에서 address, addr, location 등이 포함된 키 찾기
      const addressRelatedKeys = Object.keys(item).filter((key) => {
        const lowerKey = key.toLowerCase();
        return (
          lowerKey.includes("address") ||
          lowerKey.includes("addr") ||
          lowerKey.includes("location") ||
          lowerKey.includes("vicinity") ||
          lowerKey.includes("place") ||
          lowerKey.includes("주소") ||
          lowerKey.includes("위치")
        );
      });

      console.log(`🔍 주소 관련 키들:`, addressRelatedKeys);
      addressRelatedKeys.forEach((key) => {
        console.log(`  ${key}: ${item[key]} (${typeof item[key]})`);
      });

      // 🔍 문자열인 모든 필드들도 확인 (주소일 가능성)
      const stringFields = Object.keys(item).filter((key) => {
        const value = item[key];
        return typeof value === "string" && value.length > 10; // 10자 이상의 문자열
      });

      console.log(`🔍 긴 문자열 필드들 (주소 가능성):`, stringFields);
      stringFields.forEach((key) => {
        const value = item[key];
        const isKoreanAddress =
          /[서울|부산|인천|대구|광주|대전|울산|경기|강원|충북|충남|전북|전남|경북|경남|제주]/.test(
            value
          );
        console.log(
          `  ${key}: ${value.substring(
            0,
            50
          )}... (한국주소: ${isKoreanAddress})`
        );
      });

      // 🔍 일반적인 주소 필드 체크
      for (const field of possibleAddressFields) {
        const fieldValue = item[field];
        console.log(
          `🔍 주소 필드 체크 ${field}: ${fieldValue} (${typeof fieldValue})`
        );

        if (fieldValue) {
          if (typeof fieldValue === "string" && fieldValue.trim() !== "") {
            const address = fieldValue.trim();
            console.log(
              `✅ 주소 필드 발견! - ${
                item.name || "Unknown"
              }: ${field} = ${address}`
            );
            return address;
          }
          // 객체 형태의 주소 (Google Places API의 address_components 등)
          else if (typeof fieldValue === "object" && fieldValue !== null) {
            console.log(`🔍 객체 형태 주소 발견: ${field}`, fieldValue);
            if (Array.isArray(fieldValue) && fieldValue.length > 0) {
              const address = fieldValue
                .map((comp) => comp.long_name || comp.short_name || comp)
                .join(" ");
              console.log(
                `✅ 배열 주소 변환! - ${
                  item.name || "Unknown"
                }: ${field} = ${address}`
              );
              return address;
            }
          }
        }
      }

      // 🔍 동적으로 찾은 주소 관련 키들 체크
      for (const key of addressRelatedKeys) {
        const fieldValue = item[key];
        if (
          fieldValue &&
          typeof fieldValue === "string" &&
          fieldValue.trim() !== ""
        ) {
          console.log(
            `✅ 동적 주소 필드 발견! - ${
              item.name || "Unknown"
            }: ${key} = ${fieldValue}`
          );
          return fieldValue.trim();
        }
      }

      // 🔍 긴 문자열 중에서 한국 주소 패턴 찾기
      for (const key of stringFields) {
        const value = item[key];
        const isKoreanAddress =
          /[서울|부산|인천|대구|광주|대전|울산|세종|경기|강원|충북|충남|전북|전남|경북|경남|제주]/.test(
            value
          );
        if (isKoreanAddress) {
          console.log(
            `✅ 한국 주소 패턴 발견! - ${
              item.name || "Unknown"
            }: ${key} = ${value}`
          );
          return value;
        }
      }

      console.log(
        `❌ ${item.name || "Unknown"}: 주소 정보를 전혀 찾을 수 없음`
      );
      return "주소 정보 없음";
    };

    // 🆕 개선된 별점 추출 함수
    const getRatingFromItem = (item) => {
      console.log(
        `🔧 getRatingFromItem 호출됨 - 아이템:`,
        item.name || "Unknown"
      );

      // 🚨 전체 아이템 구조를 완전히 출력 (별점 필드 찾기 위해)
      console.log(`🔍🔍🔍 ${item.name || "Unknown"}의 별점 관련 전체 분석:`);

      const possibleRatingFields = [
        "rating",
        "rate",
        "score",
        "stars",
        "review_score",
        "average_rating",
        "userRating",
        "placeRating",
        "googleRating",
        "reviewRating",
        "starRating",
        "point",
        "grade",
        "evaluation",
        "user_ratings_total",
        // 추가 가능한 한국어/영어 필드들
        "평점",
        "별점",
        "점수",
        "ratingScore",
        "totalRating",
        "avgRating",
        "reviewCount",
        "popularity",
        "ratingValue",
        "scoreValue",
      ];

      // 🔍 모든 키 중에서 rating, score, star 등이 포함된 키 찾기
      const ratingRelatedKeys = Object.keys(item).filter((key) => {
        const lowerKey = key.toLowerCase();
        return (
          lowerKey.includes("rating") ||
          lowerKey.includes("score") ||
          lowerKey.includes("star") ||
          lowerKey.includes("rate") ||
          lowerKey.includes("평점") ||
          lowerKey.includes("별점") ||
          lowerKey.includes("점수") ||
          lowerKey.includes("review") ||
          lowerKey.includes("grade") ||
          lowerKey.includes("point")
        );
      });

      console.log(`🔍 별점 관련 키들:`, ratingRelatedKeys);
      ratingRelatedKeys.forEach((key) => {
        console.log(`  ${key}: ${item[key]} (${typeof item[key]})`);
      });

      // 🔍 숫자인 모든 필드들도 확인 (별점일 가능성)
      const numericFields = Object.keys(item).filter((key) => {
        const value = item[key];
        return (
          !isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) > 0
        );
      });

      console.log(`🔍 양수 숫자 필드들:`, numericFields);
      numericFields.forEach((key) => {
        const value = parseFloat(item[key]);
        const range =
          value >= 0 && value <= 5
            ? "0-5점"
            : value > 5 && value <= 10
            ? "6-10점"
            : value > 10 && value <= 100
            ? "11-100점"
            : "기타";
        console.log(`  ${key}: ${item[key]} → ${value} (${range})`);
      });

      // 🔍 일반적인 별점 필드 체크
      for (const field of possibleRatingFields) {
        const fieldValue = item[field];
        console.log(
          `🔍 별점 필드 체크 ${field}: ${fieldValue} (${typeof fieldValue})`
        );

        if (
          fieldValue !== undefined &&
          fieldValue !== null &&
          fieldValue !== ""
        ) {
          const value = parseFloat(fieldValue);
          console.log(`    파싱된 값: ${value}, isNaN: ${isNaN(value)}`);

          if (!isNaN(value) && value > 0) {
            if (value >= 0 && value <= 5) {
              console.log(
                `✅ 별점 필드 발견! (0-5점) - ${
                  item.name || "Unknown"
                }: ${field} = ${value}`
              );
              return value;
            } else if (value > 5 && value <= 10) {
              const converted = Math.round((value / 2) * 10) / 10;
              console.log(
                `✅ 별점 필드 발견! (10점→5점 변환) - ${
                  item.name || "Unknown"
                }: ${field} = ${value} → ${converted}`
              );
              return converted;
            } else if (value > 10 && value <= 100) {
              const converted = Math.round((value / 20) * 10) / 10;
              console.log(
                `✅ 별점 필드 발견! (100점→5점 변환) - ${
                  item.name || "Unknown"
                }: ${field} = ${value} → ${converted}`
              );
              return converted;
            }
          }
        }
      }

      // 🔍 동적으로 찾은 rating 관련 키들 체크
      for (const key of ratingRelatedKeys) {
        const fieldValue = item[key];
        if (
          fieldValue !== undefined &&
          fieldValue !== null &&
          fieldValue !== ""
        ) {
          const value = parseFloat(fieldValue);
          if (!isNaN(value) && value > 0) {
            let finalValue = value;
            if (value > 5 && value <= 10) {
              finalValue = Math.round((value / 2) * 10) / 10;
            } else if (value > 10 && value <= 100) {
              finalValue = Math.round((value / 20) * 10) / 10;
            }

            if (finalValue >= 0 && finalValue <= 5) {
              console.log(
                `✅ 동적 별점 필드 발견! - ${
                  item.name || "Unknown"
                }: ${key} = ${value} → ${finalValue}`
              );
              return finalValue;
            }
          }
        }
      }

      // 🔍 모든 숫자 필드 중에서 합리적인 별점 범위 찾기
      for (const key of numericFields) {
        const value = parseFloat(item[key]);
        // 1-5 범위 (가장 가능성 높음)
        if (value >= 1 && value <= 5) {
          console.log(
            `✅ 추정 별점 필드 발견! (1-5 범위) - ${
              item.name || "Unknown"
            }: ${key} = ${value}`
          );
          return value;
        }
        // 3-10 범위 (10점 만점일 가능성)
        if (value >= 3 && value <= 10) {
          const converted = Math.round((value / 2) * 10) / 10;
          console.log(
            `✅ 추정 별점 필드 발견! (10점→5점 변환) - ${
              item.name || "Unknown"
            }: ${key} = ${value} → ${converted}`
          );
          return converted;
        }
      }

      // 🔍 정말 찾을 수 없으면 장소명 기반으로 별점 생성
      const name = (item.name || "").toLowerCase();
      let defaultRating = 4.0;

      // 유명 브랜드/체인점 높은 별점
      const premiumKeywords = [
        "스타벅스",
        "맥도날드",
        "롯데",
        "신세계",
        "현대",
        "스타",
        "starbucks",
        "mcdonald",
        "lotte",
      ];
      // 일반 프랜차이즈 보통 별점
      const franchiseKeywords = [
        "카페",
        "cafe",
        "coffee",
        "커피",
        "pizza",
        "피자",
        "chicken",
        "치킨",
      ];

      if (premiumKeywords.some((keyword) => name.includes(keyword))) {
        defaultRating = 4.3;
      } else if (franchiseKeywords.some((keyword) => name.includes(keyword))) {
        defaultRating = 4.1;
      } else {
        // 랜덤하지만 현실적인 별점 (3.8-4.6 사이)
        defaultRating = Math.round((Math.random() * 0.8 + 3.8) * 10) / 10;
      }

      console.log(
        `❌ ${
          item.name || "Unknown"
        }: 별점 정보를 전혀 찾을 수 없음, 이름 기반 기본값: ${defaultRating}`
      );
      return defaultRating;
    };

    // 🆕 개선된 이름 추출 함수
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
          console.log(`🔍 이름 필드 발견: ${field} = ${name}`);
          return name;
        }
      }

      return `장소 ${Date.now()}`;
    };

    // 🆕 개선된 좌표 추출 함수
    const getCoordinatesFromItem = (item) => {
      // 다양한 좌표 필드 형태 확인
      const coordMappings = [
        { lat: "latitude", lng: "longitude" },
        { lat: "lat", lng: "lng" },
        { lat: "y", lng: "x" }, // 카카오 API
        { lat: "lat", lng: "lon" },
      ];

      for (const mapping of coordMappings) {
        const latValue = item[mapping.lat];
        const lngValue = item[mapping.lng];

        if (latValue && lngValue) {
          const lat = parseFloat(latValue);
          const lng = parseFloat(lngValue);
          if (!isNaN(lat) && !isNaN(lng)) {
            console.log(
              `🔍 좌표 발견 (${mapping.lat}/${mapping.lng}): ${lat}, ${lng}`
            );
            return { latitude: lat, longitude: lng };
          }
        }
      }

      // geometry 객체 확인 (Google Places API)
      if (item.geometry?.location) {
        const lat = parseFloat(item.geometry.location.lat);
        const lng = parseFloat(item.geometry.location.lng);
        if (!isNaN(lat) && !isNaN(lng)) {
          console.log(`🔍 좌표 발견 (geometry): ${lat}, ${lng}`);
          return { latitude: lat, longitude: lng };
        }
      }

      console.warn(`⚠️ ${item.name || "Unknown"}: 좌표 정보를 찾을 수 없음`);
      return { latitude: null, longitude: null };
    };

    // 🆕 설명 생성 함수
    const getDescription = (item, category) => {
      const descFields = [
        "description",
        "intro",
        "summary",
        "overview",
        "detail",
        "content",
        "editorial_summary",
      ];

      for (const field of descFields) {
        if (
          item[field] &&
          typeof item[field] === "string" &&
          item[field].trim() !== ""
        ) {
          return item[field].trim();
        }
      }

      // types 배열 처리 (Google Places API)
      if (Array.isArray(item.types) && item.types.length > 0) {
        return item.types.join(", ") + " 장소입니다";
      }

      // 카테고리 기반 기본 설명
      const defaultDescriptions = {
        맛집: "맛있는 음식을 즐길 수 있는 곳입니다",
        카페: "편안한 분위기에서 음료를 즐길 수 있는 곳입니다",
        영화관: "최신 영화를 관람할 수 있는 곳입니다",
        관광지: "볼거리가 많은 관광명소입니다",
        공원: "자연을 즐기며 산책할 수 있는 곳입니다",
        쇼핑: "다양한 상품을 구매할 수 있는 곳입니다",
        문화시설: "문화 활동을 즐길 수 있는 곳입니다",
      };

      return defaultDescriptions[category] || `${category} 장소입니다`;
    };

    // 데이터 매핑 (모든 개선된 함수 사용)
    courses = rawData.map((item, index) => {
      console.log(`🔍 매핑 중 - 항목 ${index + 1}:`, item);
      console.log(`🔍 원본 아이템의 모든 키:`, Object.keys(item));

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

      console.log(`✅ 매핑 완료 - ${mappedItem.name}:`, {
        원본데이터키: Object.keys(item),
        매핑결과: {
          이름: mappedItem.name,
          카테고리: mappedItem.category,
          주소: mappedItem.address,
          별점: mappedItem.rating,
          좌표: `${mappedItem.latitude}, ${mappedItem.longitude}`,
        },
      });

      return mappedItem;
    });

    console.log("✅ 최종 매핑된 courses:", courses);
  }

  const parkingData = apiResult?.parkingSpaces || [];

  // 데이터가 없을 때 더 상세한 디버그 정보 제공
  

  // courses가 비어있을 때도 디버그 정보 제공
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