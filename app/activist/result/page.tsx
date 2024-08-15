"use client"; // 클라이언트 컴포넌트로 명시

import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';
import { useRouter } from 'next/navigation';
import PeopleModal from '@/components/PeopleModal';
import AlertPopup from "@/components/AlertPopupProps";
import Footer from "@/components/Footer";
import LikeButton from "@/components/LikeButton";
import Navigation from "@/components/Navigation";

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
    imagePath: string; // 인물 사진 URL 추가
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
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
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
                    setError(`결과조회에 실패했습니다! \n 다시 조회해주세요!`);
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
            image: content.imagePath,
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

    const handleCopyLink = () => {
        const baseUrl = window.location.origin;
        const searchPageUrl = `${baseUrl}/activist`;

        navigator.clipboard.writeText(searchPageUrl).then(() => {
            setIsAlertVisible(true);
            setTimeout(() => setIsAlertVisible(false), 2000); // 2초 후 알림 숨김
        }, (err) => {
            console.error('링크 복사 실패: ', err);
        });
    };

    const handleGoToMyName = () => {
        router.push('/myname');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4">
            <Navigation />

            <div className="flex flex-col items-center flex-1 px-4">
                <h1 className="text-xl text-blue-400 font-bold mb-1 text-center">내 이름과 비슷한</h1>
                <h1 className="text-2xl text-blue-500 font-bold mb-4 text-center">독립운동가는?🇰🇷</h1>

                <img
                    className="w-full p-3 max-w-md bg-white p-2 rounded-t-lg shadow-md"
                    src="/activist.jpg"
                    alt="광복절 이미지"
                />

                {loading ? (
                    <div className="w-full p-3 max-w-md bg-white p-2 shadow-md text-center">
                        <p className="text-lg font-bold text-gray-700 mb-4">데이터를 가져오는 중입니다...🔍</p>
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
                        <h3 className="text-xl font-bold text-gray-700 mb-2">
                            검색 이름: {simpleName?.name}
                        </h3>
                        <h1 className="text-2xl font-bold text-gray-700 mb-4">
                            찾아낸 독립운동가들😎<br/>
                        </h1>
                        <h5>최대 10명까지 보여집니다😀</h5>
                        <h6>카드를 터치하면 위인의 업적을 볼 수 있어요!</h6>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {contents.map((content) => (
                                <div
                                    key={content.id}
                                    className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                                    onClick={() => handleOpenModal(content)}
                                >
                                    <img
                                        src={content.imagePath ? `/activists/${content.imagePath}` : "/none_profile.png"}
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
                    <p className="text-lg font-bold text-gray-700 mb-4">결과가 없습니다.😭</p>
                    </div>
                )}

                <div className="w-full p-3 max-w-md bg-white p-2 rounded-b-lg shadow-md text-center">
                    <div className="space-y-2"> {/* 버튼들을 감싸는 div에 space-y-2 클래스 추가 */}
                        <button
                            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-lg"
                            onClick={() => router.back()}
                        >
                            다시 찾기
                        </button>
                        <button
                            className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 text-lg"
                            onClick={handleCopyLink}
                        >
                            링크 복사하기
                        </button>
                        <button
                            className="w-full py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 text-lg"
                            onClick={handleGoToMyName}
                        >
                            당신의 이름은?🕵🏻‍
                        </button>
                    </div>
                </div>
            </div>

            <PeopleModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                content={selectedContent}
                onOutsideClick={handleCloseModal}
            />

            <AlertPopup
                message="링크가 클립보드에 복사되었습니다!"
                isVisible={isAlertVisible}
            />
            {/*<LikeButton />*/}
            {/*<Footer githubUrl="https://github.com/Camof1ow" />*/}

        </div>
    );
};

export default FormPage;
