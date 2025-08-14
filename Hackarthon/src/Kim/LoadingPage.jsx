import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/Temporarily");
        }, 10000); // 10초 후 자동 이동

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className='relative w-screen h-screen bg-cover bg-center'>
            {/* 배경 이미지 */}
            <img
                src="/img/map.png"
                alt=""
                className="fixed inset-0 w-full h-full object-cover -z-10"
            />
            
            {/* 배경 투명도 레이어 */}
            <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                {/* 핑크색 테두리 박스 */}
                <div
                    className='w-[904px] h-[453px] border-4 border-pink-500 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm'
                >
                    <h1 className='text-2xl font-semibold text-white'>검색중입니다</h1>
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;
