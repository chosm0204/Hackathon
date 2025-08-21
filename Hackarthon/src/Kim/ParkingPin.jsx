import React from 'react';

const ParkingPin = () => {
    const dummyParking = [
        { id: 1, x: 150, y: 50 },   
        { id: 2, x: 650, y: 80 },   
        { id: 3, x: 200, y: 300 },  
        { id: 4, x: 600, y: 350 },  
        { id: 5, x: 250, y: 550 },  
        { id: 6, x: 700, y: 650 },  
    ];

    return (
        <>
            {dummyParking.map((pin) => (
                <div
                    key={pin.id}
                    className="absolute w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md cursor-pointer hover:scale-110 transition-transform"
                    style={{ left: `${pin.x}px`, top: `${pin.y}px` }}
                >
                    P
                </div>
            ))}
        </>
    );
};

export default ParkingPin;
