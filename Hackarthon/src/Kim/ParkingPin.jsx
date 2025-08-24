// src/ParkingPin.jsx
import React from "react";

const ParkingPin = ({ parkingData }) => {
  return (
    <>
      {parkingData.map((pin) => (
        <div
          key={pin.id}
          className="absolute w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold select-none shadow-md"
          style={{
            top: pin.top,
            left: pin.left,
            transform: "translate(-50%, -50%)",
          }}
        >
          P
        </div>
      ))}
    </>
  );
};

export default ParkingPin;
