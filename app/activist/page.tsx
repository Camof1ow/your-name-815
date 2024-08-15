"use client";

import React, { useState, useEffect } from "react";
import Modal from '@/components/Modal';
import { useGlobalContext } from '@/context/GlobalContext';
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import LikeButton from "@/components/LikeButton";
import Navigation from "@/components/Navigation";

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
    const [warningMessage, setWarningMessage] = useState<string>('');
    const [modal, setModal] = useState<Modal>(defaultModalState);
    const { setSimpleName } = useGlobalContext();
    const router = useRouter();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        validateInput(value);
    };

    const validateInput = (value: string) => {
        if (containsInvalidCharacters(value)) {
            setWarningMessage('숫자, 영어, 이모지는 입력할 수 없어요.😭');
        } else if (value.length > 5) {
            setWarningMessage('이름은 5자 이하로 입력해주세요.😭');
        } else {
            setWarningMessage('');
        }
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
        const completeKoreanRegex = /^[가-힣]+$/;
        return completeKoreanRegex.test(text);
    };

    const containsInvalidCharacters = (text: string) => {
        const invalidRegex = /[0-9a-zA-Z]|[\uD800-\uDBFF][\uDC00-\uDFFF]/;
        return invalidRegex.test(text);
    };

    const handleSubmit = () => {
        const trimmedValue = inputValue.trim();

        if (!trimmedValue) {
            setModal({
                isOpen: true,
                body: '이름을 입력해주세요.'
            });
            return;
        }

        if (!isCompleteKorean(trimmedValue)) {
            setModal({
                isOpen: true,
                body: '한글 완성형 문자만 입력 가능합니다.'
            });
            return;
        }

        if (trimmedValue.length > 5) {
            setModal({
                isOpen: true,
                body: '이름은 5자 이하로 입력해주세요.'
            });
            return;
        }

        setSimpleName({ name: trimmedValue });
        router.push("/activist/result")
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4">
            <Navigation />

            <div className="flex flex-col items-center flex-1 px-4">
                <h1 className="text-xl text-blue-400 font-bold mb-1 text-center">내 이름과 비슷한</h1>
                <h1 className="text-2xl text-blue-500 font-bold mb-4 text-center">독립운동가는?🇰🇷</h1>

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
                        maxLength={5}
                    />
                    {warningMessage && (
                        <p className="text-red-500 text-sm mt-1">{warningMessage}</p>
                    )}
                </div>

                <div className="w-full p-3 max-w-md bg-white p-2 rounded-b-lg shadow-md text-center">
                    <button className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-lg"
                            onClick={handleSubmit}
                    >
                        찾아보기
                    </button>
                </div>
            </div>

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

            {/*<LikeButton />*/}
            {/*<Footer githubUrl="https://github.com/Camof1ow" />*/}
        </div>
    );
};

export default FormPage;