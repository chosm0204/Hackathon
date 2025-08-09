import React from 'react';




const Header = () => {
    return (
        <header className='top-0 left-0 w-full bg-white shadow-md '>
            <div className='flex justify-between items-center py-3 px-10'>
                <a href="/"><img src="/img/pink.png" alt="logoIcon" /></a>
                {/* 검색창 만들부분 */}

                <div className='flex items-center space-x-2 border-b-2 border-[#E387A1] w-150 py-2'>
                    <img className='w-15 pr-6' src="/img/pink2.png" alt="logo2Icon" />
                    <input type="text" 
                     placeholder='원하는 지역, 음식, 축제 등을 검색하세요.'
                     className='text-[#E387A1] font-bold outline-none  w-96 text-sm'/>
                </div>
                





                {/* 로그인 및 회원가입 만들부분 */}
                <ul className='flex  font-bold  text-[#E387A1]'>
                    <li className='hover:text-pink-600'>
                        <a href="login" >로그인</a>
                    </li>
                    <div>/</div>
                    <li className='hover:text-pink-600'>
                        <a href="signup">회원가입</a>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;