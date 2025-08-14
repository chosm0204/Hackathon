import React from 'react';
import { useNavigate } from 'react-router-dom';

const Detail = () => {
    const navigate = useNavigate ();

    const gotoCourse = () =>{
        navigate("/Course");
    };
    return (
        <div>
            <button className='bg-blue-300' onClick={gotoCourse}>
                코스페이지 이동
            </button>
        </div>
    );
};

export default Detail;