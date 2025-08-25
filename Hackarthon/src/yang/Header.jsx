import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  // 사이드 메뉴의 열림/닫힘 상태를 관리하는 state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 로그인 상태를 관리하는 state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 컴포넌트가 마운트될 때 로그인 상태를 확인합니다.
  useEffect(() => {
    // localStorage에 토큰이 있는지 확인하여 로그인 상태를 업데이트합니다.
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // 메뉴 상태를 토글하는 함수
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 로그아웃 버튼 클릭 시 실행될 함수
  const handleLogout = () => {
    // localStorage에서 토큰을 삭제하여 로그인 상태를 해제합니다.
    localStorage.removeItem('token');
    
    // 로그인 상태를 false로 업데이트
    setIsLoggedIn(false);
    
    // 메뉴를 닫습니다.
    setIsMenuOpen(false);

    // 로그아웃 후 로그인 페이지로 이동합니다.
    navigate("/login");
  };

  return (
    <header className='fixed z-50 top-0 left-0 w-full bg-white shadow-md'>
      <div className='flex justify-between items-center py-3 px-10'>
        
        <p className='font-bold text-[#E387A1]'>
          <a href="https://www.youtube.com/watch?v=556qz9yf7zs&list=RD556qz9yf7zs&start_radio=1 " target="_blank" rel="noopener noreferrer">왜 만들었냐고?</a>
          <br />
        </p>
        <div className='flex pr-[100px]'>
          <a href="/"><img src="/img/Vector.png" alt="logoIcon" className='w-[40px] mr-4'/></a>
          <a href="/"><img src="/img/DayMaker.png" alt="logoIcon" className='mt-[12px] w-[160px]'/></a>
        </div>
        
        <button 
          onClick={toggleMenu} 
          className='flex flex-col space-y-1.5 p-2 transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-[#E387A1]'
          aria-label="Toggle menu"
        >
          <span className={`block w-8 h-[4px] bg-[#E387A1] rounded-full transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-8 h-[4px] bg-[#E387A1] rounded-full transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-8 h-[5px] bg-[#E387A1] rounded-full transition-transform duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      <div className={`rounded-lg fixed top-0 right-0 w-64 h-auto bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex justify-end p-4'>
          <button onClick={toggleMenu} className='text-gray-500 hover:text-[#E387A1]' aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className='flex flex-col justify-center items-center font-bold space-y-6 '>
          
          {/* 로그인 상태에 따라 다른 메뉴를 표시합니다. */}
          {isLoggedIn ? (
              <li className='w-full px-[20px]'>
                <div className='flex'>
          <a href="/"><img src="/img/Vector.png" alt="logoIcon" className='w-[40px] mr-1'/></a>
          <a href="/"><img src="/img/DayMaker.png" alt="logoIcon" className='mt-[12px] w-[160px]'/></a>
        </div>
                
                <button onClick={handleLogout} className='mt-[20px] rounded-lg border border-[#E387A1] block w-full text-center text-[#E387A1] hover:bg-[#E387A1] hover:text-white py-4 transition-colors duration-200'>
                  로그아웃
                </button>
              <button>
                
              </button>
              </li>
              
          ) : (
              <>
                <li className='w-full px-[20px]'>
                  <div className='flex '>
          <a href="/"><img src="/img/Vector.png" alt="logoIcon" className='w-[40px] mr-1'/></a>
          <a href="/"><img src="/img/DayMaker.png" alt="logoIcon" className='mt-[12px] w-[160px]'/></a>
        </div>
                  <Link to="/login" onClick={toggleMenu} className='mt-[20px] rounded-lg border border-[#E387A1] block w-full text-center text-[#E387A1] hover:bg-[#E387A1] hover:text-white    py-4 transition-colors duration-200'>
                    로그인
                  </Link>
                </li>
                <li className='w-full px-[20px]'>
                  <Link to="/signup" onClick={toggleMenu} className='rounded-lg  border border-[#E387A1] block w-full text-center text-[#E387A1] hover:bg-[#E387A1] hover:text-white py-4 transition-colors duration-200'>
                    회원가입
                  </Link>
                </li>
                <li>
                  
                </li>
                {/* <div className=' text-sm text-gray-400'>
                <a href='https://www.instagram.com/likelion_sku/'  target="_blank" rel="noopener noreferrer">창조주들</a>
                </div> */}
              </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
