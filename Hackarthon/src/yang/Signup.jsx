import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();

    // 입력값 상태 관리
    const [formData, setFormData] = useState({
        nickname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 회원가입 요청
    const handleSignup = async () => {
        // 비밀번호 확인
        if (formData.password !== formData.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
        }

        try {
            const response = await axios.post(
                "http://43.203.141.38:8080/api/users/register",
                // "/api/users/register"
                {
                    email: formData.email,
                    password: formData.password,
                    nickname: formData.nickname,
                }
            );

            if (response.status === 200 || response.status === 201) {
                alert("회원가입이 완료되었습니다!");
                navigate("/login");
            }
        } catch (error) {
        console.error(error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("회원가입에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="mt-[100px] flex items-center justify-center p-8">
            <div className="w-full p-8 max-w-2xl">
                <h2 className="text-center font-bold text-3xl">회원가입</h2>
                <p className="mt-[7px] text-center text-xl">
                DayMaker 회원이 되어 추천 경로를 확정하세요!
                </p>

                <div className="space-y-6 mt-[70px]">
                    <div>
                        <p className="text-lg text-left font-bold">닉네임</p>
                        <input
                            type="text"
                            name="nickname"
                            placeholder="닉네임 입력(3자~10자)"
                            value={formData.nickname}
                            onChange={handleChange}
                            className="h-[50px] text-sm mt-2 px-3 py-2 w-full border border-pink-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <p className="text-lg text-left font-bold">이메일</p>
                        <input
                        type="email"
                        name="email"
                        placeholder="ex) daymaker@naver.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="h-[50px] text-sm mt-2 px-3 py-2 w-full border border-pink-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div>
                        <p className="text-lg text-left font-bold">비밀번호</p>
                        <input
                            type="password"
                            name="password"
                            placeholder="비밀번호 입력(영어대소문자, 숫자, 특수문자 포함 8자~20자)"
                            value={formData.password}
                            onChange={handleChange}
                            className="h-[50px] text-sm mt-2 px-3 py-2 w-full border border-pink-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div>
                        <p className="text-lg text-left font-bold">비밀번호 확인</p>
                            <input
                            type="password"
                            name="confirmPassword"
                            placeholder="비밀번호 재입력"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="h-[50px] text-sm mt-2 px-3 py-2 w-full border border-pink-300 rounded-md shadow-sm"
                            />
                    </div>
                </div>

                <div className="mt-[100px] flex justify-center">
                    <button
                        className="m-[25px] w-[250px] h-[70px] border border-[#E387A1] rounded-2xl text-sm font-medium bg-white hover:bg-pink-600"
                        onClick={handleGoBack}
                    >
                        돌아가기
                    </button>
                    <button
                        className="m-[25px] w-[250px] h-[70px] border rounded-2xl text-sm font-medium text-white bg-[#E387A1] hover:bg-pink-600"
                        onClick={handleSignup}
                    >
                        회원가입 완료하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
