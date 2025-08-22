import React from 'react';




const Header = () => {
    return (
        <header className='fixed z-50 top-0 left-0 w-full bg-white shadow-md'>
            <div className='flex justify-between items-center py-3 px-10'>
                <p className='font-bold text-[#E387A1]'>
                    <a href="https://www.youtube.com/watch?v=556qz9yf7zs&list=RD556qz9yf7zs&start_radio=1 "  target="_blank" >왜 만들었냐고?</a>
                    <br />
                </p>
                <div className='flex pr-[100px]'>
                
                <a href="/"><img src="/img/Vector.png"  alt="logoIcon" className='w-[40px] mr-4'/></a>
                <a href="/"><img src="/img/DayMaker.png" alt="logoIcon" className='mt-[12px] w-[160px]'/></a>
                </div>
                <p className='font-bold text-[#E387A1]'>
                    <a href="https://www.instagram.com/likelion_sku/" target="_blank">창조주들</a>
                    <br />
                </p>
                
                
                {/* 검색창 만들부분 */}

                {/* <div className='flex items-center space-x-2 border-b-2 border-[#E387A1] w-[700px] py-2'>
                    <img className='w-15 pr-6' src="/img/pink2.png" alt="logo2Icon" />
                    <input type="text" 
                     placeholder='원하는 지역, 음식, 축제 등을 검색하세요.'
                     className='text-[#E387A1] font-bold outline-none  w-96 text-sm placeholder-[#E387A1]'/>
                </div>
                 */}





                {/* 로그인 및 회원가입 만들부분 */}
                {/* <ul className='flex items-center font-bold  '>
                    <li className='hover:text-pink-600 w-[70px]'>
                        <a className='flex justify-center hover:text-pink-600 w-[70px] text-[#E387A1]' href="login" >로그인</a>
                    </li>
                    <li className=''>
                        <a className='flex justify-center items-center hover:bg-pink-600 text-white bg-[#E387A1] border border-[#E387A1] rounded-xl w-[100px] h-[40px]' href="signup">회원가입</a>
                    </li>
                </ul> */}
            </div>
        </header>
    );
};

export default Header;