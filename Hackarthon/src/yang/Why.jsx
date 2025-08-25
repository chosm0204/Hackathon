import React from 'react';

const Why = () => {
    return (
        <div className='flex text-xl mt-[50px]  justify-center items-center'>
            <img className="absolute inset-0 w-full h-full object-cover -z-10" src="./img/Background_Pink.png" alt="" />
            <div className='mt-[100px] text-2xl font-bold'>
           <div className='flex justify-center '><div className='mt-[8px]'>저희 팀은 침체된 지역 상권을 살리기 위해</div> <div className='pl-1 text-4xl text-pink-700 align-middle'> DayMaker</div> <div className='mt-[8px]'>를 기획했습니다.</div> </div><br />
<div className='flex justify-center ' >사용자가 먹거리, 문화생활, 인원수 조건을 입력하면,</div><br />
<div className='flex justify-center'><div className='mt-[8px]'>AI가 지역 축제, 자연 체험, 로컬 카페·맛집을 포함한</div> <div className='pl-1 text-4xl text-pink-700 align-middle'>맞춤형 코스</div><div className='mt-[8px]'>를 추천합니다.</div></div><br/>

<div className='flex justify-center ' ><div>숨은 카페와 개성 있는 식당, 문화생활를 즐기며</div><br />
    <div>지역에서의 하루를 특별하게 만듭니다.</div></div><br />


</div>
        </div>
    );
};

export default Why;