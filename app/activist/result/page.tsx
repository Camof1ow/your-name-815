"use client"; // 클라이언트 컴포넌트로 명시

import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';
import Navigation from '@/components/Navigation';
import { useRouter } from 'next/navigation';
import PeopleModal from '@/components/PeopleModal';

interface Contents {
    id: number;
    nameHanja: string;
    movementFamily: string;
    orderYear: number;
    name: string;
    addressBirth: string;
    bornDied: string;
    content: string;
    activities: string;
    engagedOrganizations: string;
    image: string; // 인물 사진 URL 추가
}

const API_URL = process.env.BE_API_URL;

const FormPage = () => {
    const { simpleName } = useGlobalContext();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [contents, setContents] = useState<Contents[]>([]);
    const [selectedContent, setSelectedContent] = useState<{
        name: string;
        image: string;
        details: string;
    } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            if (simpleName) {
                setLoading(true);
                try {
                    const response = await fetch(`/backend/api/activists?name=${simpleName.name}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    setContents(result["contents"]);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError('Failed to fetch data');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [simpleName]);

    const handleOpenModal = (content: Contents) => {
        const modalContent = {
            name: content.name + `(${content.nameHanja})`,
            image: "/none_profile.png",
            details: `운동계열: ${content.movementFamily}\n
            활동: ${content.activities}\n
            조직: ${content.engagedOrganizations}\n
            생몰년: ${content.bornDied}\n
            출생지: ${content.addressBirth}\n
            주요 내용: ${content.content}`
        };
        setSelectedContent(modalContent);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedContent(null);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 p-4">
            <Navigation />

            <div className="flex flex-col items-center flex-1 px-4">
                <h1 className="text-xl text-blue-400 font-bold mb-1 text-center">내 이름과 비슷한</h1>
                <h1 className="text-2xl text-blue-500 font-bold mb-4 text-center">독립운동가는?</h1>

                <img
                    className="w-full p-3 max-w-md bg-white p-2 rounded-t-lg shadow-md"
                    src="/activist.jpg"
                    alt="광복절 이미지"
                />

                {loading ? (
                    <div className="w-full p-3 max-w-md bg-white p-2 shadow-md text-center">
                        <p className="text-lg font-bold text-gray-700 mb-4">데이터를 가져오는 중입니다...</p>
                        <div className="loader">
                            <div className="spinner-border animate-spin"></div>
                        </div>
                    </div>
                ) : error ? (
                    <div className="w-full p-3 max-w-md bg-red-100 p-6 shadow-md text-center">
                        <h3 className="text-lg font-bold text-red-600">오류:</h3>
                        <p>{error}</p>
                    </div>
                ) : contents.length > 0 ? (
                    <div className="w-full p-3 max-w-md bg-white p-2 shadow-md text-center">
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">발견된 독립운동가들</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {contents.map((content) => (
                                <div
                                    key={content.id}
                                    className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                                    onClick={() => handleOpenModal(content)}
                                >
                                    <img
                                        src="/none_profile.png"
                                        alt={content.name}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                    <h3 className="text-lg font-bold mt-2 text-center">{content.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="w-full p-3 max-w-md bg-white p-2 shadow-md text-center">
                        <p className="text-lg font-bold text-gray-700 mb-4">결과가 없습니다.</p>
                    </div>
                )}

                <div className="w-full p-3 max-w-md bg-white p-2 rounded-b-lg shadow-md text-center">
                    <button
                        className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-lg"
                        onClick={() => router.back()}
                    >
                        다시 찾기
                    </button>
                </div>
            </div>

            <PeopleModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                content={selectedContent}
                onOutsideClick={handleCloseModal}
            />
        </div>
    );
};

export default FormPage;
