import React from 'react';
import Temporarily from './Temporarily';
import Departure from './Departure';

const TemAll = () => {
    return (
        <div className='mt-36'>
            {/* 배경 이미지  */}
            <img
                src="/img/map.png"
                alt="배경 지도"
                className="fixed inset-0 w-full h-full object-cover -z-10 opacity-40"
            />
                  <div className="fixed inset-0 bg-white/30 backdrop-blur-[5px] -z-10" />
           
            <Departure/>
            <Temporarily/>
        </div>
    );
};

export default TemAll;