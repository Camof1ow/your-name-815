"use client"; // 클라이언트 컴포넌트로 명시

import Navigation from '@/components/Navigation';
import React, {useState} from "react";
import Modal from '@/components/Modal';
import { useGlobalContext } from '@/context/GlobalContext';
import {router} from "next/client";
import {useRouter} from "next/navigation";

interface Modal {
    isOpen: boolean;
    body: string;
}

const defaultModalState: Modal = {
    isOpen: false,
    body: ''
};

const FormPage = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [modal, setModal] = useState<Modal>(defaultModalState);
    const { data, simpleName, setSimpleName } = useGlobalContext();
    const router = useRouter(); // useRouter 사용

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleModalClose = () => {
        setModal(defaultModalState);
    };

    const isCompleteKorean = (text: string) => {
        // 한글 완성형 문자가 아닌 경우를 체크하는 정규 표현식
        const completeKoreanRegex = /^[가-힣]+$/;
        return completeKoreanRegex.test(text);
    };

    const nameTooLong = (text: string) => {
        const length = text.length;
        return length > 5;
    }

    const handleSubmit = () => {
        if (!inputValue.trim()) {
            setModal({
                isOpen: true,
                body: '이름을 입력해주세요.'
            });
            return;
        }

        if (!isCompleteKorean(inputValue) || nameTooLong(inputValue)) {
            setModal({
                isOpen: true,
                body: '이름을 확인해 주세요.'
            });
            return;
        }
        setSimpleName({ name: inputValue });
        router.push("/activist/result")
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 p-4">
            <Navigation /> {/* 네비게이션 탭을 여기에 추가 */}

            <div className="flex flex-col items-center flex-1 px-4">
                <h1 className="text-xl text-blue-400 font-bold mb-1 text-center">내 이름과 비슷한</h1>
                <h1 className="text-2xl text-blue-500 font-bold mb-4 text-center">독립운동가는?</h1>

                <img className="w-full p-3 max-w-md bg-white p-2 rounded-t-lg shadow-md"
                    src="/activist.jpg"
                    alt="광복절 이미지"
                />

                <div className="w-full p-3 max-w-md bg-white p-2 shadow-md">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        className="mt-4 p-2 block w-full border border-gray-300 rounded-md text-lg text-center"
                        placeholder="이름을 입력하세요"
                    />
                </div>

                <div className="w-full p-3 max-w-md bg-white p-2 rounded-b-lg shadow-md text-center">
                    <button className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-lg"
                        onClick={handleSubmit}
                    >
                      찾아보기
                    </button>

                </div>
            </div>

            {/* 모달 컴포넌트 */}
            <Modal
                isOpen={modal.isOpen}
                onClose={handleModalClose}
            >
                <p className="text-gray-700 text-center leading-relaxed">{modal.body}</p>
                <button
                    onClick={() => {
                        setModal(defaultModalState)
                    }}
                    className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    알겠습니다.
                </button>
            </Modal>


        </div>
    );
};

export default FormPage;
