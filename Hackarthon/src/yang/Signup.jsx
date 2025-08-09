import React from 'react';

const Signup = () => {
    return (
        <div>
            <div className='flex items-center justify-center p-8'>
            <div className='w-full p-8 max-w-lg rounded-xl border border-gray-100 shadow-md space-y-6'>
                <h2 className='text-center text-[#E387A1] font-bold text-3xl '>회원가입</h2>

                <div>
                    <p className='text-sm text-left text-[#E387A1]'>이름</p>
                    <input type="name" placeholder="이름" className='text-[#E387A1] mt-2 px-3 py-2 w-full border border-pink-300 rounded-md shadow-sm'/>
                </div>

                <div>
                    <p className='text-sm text-left text-[#E387A1]'>이메일</p>
                    <input type="email" placeholder="이메일 주소" className='text-[#E387A1] mt-2 px-3 py-2 w-full border border-pink-300 rounded-md shadow-sm'/>
                </div>

                <div>
                    <p className='text-sm text-left text-[#E387A1]'>비밀번호</p>
                    <input type="password" placeholder="비밀번호" className='text-[#E387A1] mt-2 px-3 py-2 w-full border border-pink-300 rounded-md shadow-sm'/>
                </div>

                <div>
                    <p className='text-sm text-left text-[#E387A1]'>비밀번호 확인</p>
                    <input type="password" placeholder="비밀번호 확인" className='text-[#E387A1] mt-2 px-3 py-2 w-full border border-pink-300 rounded-md shadow-sm'/>
                </div>
                

                <div className='flex items-center justify-end text-sm'>
                    <a href="login" className='font-medium text-[#E387A1] hover:underline'>
                        로그인페이지로

                    </a>
                </div>


                <button className='w-full flex justify-center py-3  px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-[#E387A1] hover:bg-pink-600'>
                    회원가입
                </button>
            </div>
        </div>
        </div>
    );
};

export default Signup;