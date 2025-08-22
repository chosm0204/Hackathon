import React from 'react';

const Footer = () => {
    return (
        <footer className=' w-full pt-30 py-10 text-gray-400'>
            <div className='mt-[150px] m-[30px] px-10'>
            <div className='mb-6'>
                <p className='flex font-bold'>(서비스) 사업자 정보</p>
            </div>
            <ul className='flex text-sm'>
                <li  className='hover:underline '>
                    <a href="#">서비스 이용약관</a>
                </li>
                 <li className='mx-8'>|</li>
                <li className=' hover:underline '>
                    <a href="#">개인정보 처리방침</a>
                </li>
                 <li className='mx-8'>|</li>
                <li className=' hover:underline '>
                    <a href="#">위치정보 이용약관</a>
                </li>
                 <li className='mx-8'>|</li>
                <li className=' hover:underline '>
                    <a href="#">서비스 이용정책</a>
                </li>
                 <li className='mx-8'>|</li>
                <li className=' hover:underline '>
                    <a href="#">고객센터</a>
                </li>
            </ul>
            </div>
        </footer>
    );
};

export default Footer;