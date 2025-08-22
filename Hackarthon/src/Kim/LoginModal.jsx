import React from "react";
import ScrollTop from "./ScrollTop";

const LoginModal = ({ onClose }) => {
    <ScrollTop/>
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 ">
            <div className="bg-white rounded-xl p-6 w-[500px] shadow-lg relative">
                <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={onClose}
                >
                ✕
                </button>
                <h2 className="text-lg font-semibold mb-4 pt-2">추천 경로를 확정하려면 로그인이 필요합니다.</h2>
                <p className="mb-6">로그인 하시겠습니까?</p>
                <div className="flex justify-end gap-4 py-2">
                    <button
                        className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                        onClick={onClose}
                    >
                    취소
                    </button>
                    <button
                        className="px-4 py-2 bg-[#E387A1] text-white rounded hover:bg-[#E387A1]"
                        onClick={() => {
                        onClose();
                        window.location.href = "/Login";
                        }}
                    >
                    로그인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
