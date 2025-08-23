import React from "react";
import { useLocation } from "react-router-dom";
import Temporarily from "./Temporarily";
import Departure from "./Departure";
import { convertCoordsToPixels } from "../cho/mapUtils";

const TemAll = () => {
  const location = useLocation();
  const apiResult = location.state?.result;
  const selectedStation = location.state?.selectedStation || "출발지";

  const courses =
    apiResult?.recommendedItineraries?.[0]?.itinerary?.map((item, index) => {
      const coords = convertCoordsToPixels(item.latitude, item.longitude);
      return {
        id: index + 1,
        title: item.place,
        category: item.category,
        description: item.description,
        address: item.address,
        rating: item.rating,
        parking: item.parking,
        top: coords.top,
        left: coords.left,
      };
    }) || [];

  const parkingData =
    apiResult?.parkingSpaces?.map((parking) => {
      const coords = convertCoordsToPixels(parking.latitude, parking.longitude);
      return {
        id: parking.id,
        top: coords.top,
        left: coords.left,
        name: parking.name,
      };
    }) || [];

  return (
    <div className="mt-36">
      <img
        src="/img/map.png"
        alt="배경 지도"
        className="fixed inset-0 w-full h-full object-cover -z-10 opacity-40"
      />
      <div className="fixed inset-0 bg-white/30 backdrop-blur-[5px] -z-10" />

      {/* ✅ Departure 컴포넌트가 올바르게 사용되고 있는지 확인하세요. */}
      <Departure stationName={selectedStation} />
      {/* ✅ Temporarily 컴포넌트가 올바르게 사용되고 있는지 확인하세요. */}
      <Temporarily courses={courses} parkingData={parkingData} />
    </div>
  );
};

export default TemAll;
