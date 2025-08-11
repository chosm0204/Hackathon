import React from 'react';
import {useNavigate} from 'react-router-dom';

const Testpage = () => {
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate('/Temporarily')
    };
    
    return (
        <div className='flex justify-center items-center mt-40 bg-white border border-pink-500 text-pink-500 px-4 py-2 rounded'>
            <button onClick={handleClick}>AI 추천 받기</button>
        </div>
    );
};

export default Testpage;