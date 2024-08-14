"use client"; // 클라이언트 컴포넌트로 명시

import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';
import { useRouter } from 'next/navigation';
import Footer from "@/components/Footer";
import LikeButton from "@/components/LikeButton";
import AlertPopup from "@/components/AlertPopupProps";
import Navigation from "@/components/Navigation";

const FormPage = () => {
    const { data } = useGlobalContext();
    const [apiResponse, setApiResponse] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
    const router = useRouter(); // useRouter 사용

    useEffect(() => {
        const fetchData = async () => {
            if (data) {
                setLoading(true); // 시작 시 로딩 상태 설정
                try {
                    const response = await fetch(`/backend/api/name?firstName=${data.firstName}&lastName=${data.lastName}&gender=${data.gender}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    setApiResponse(result["contents"]);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError('Failed to fetch data');
                } finally {
                    setLoading(false); // 요청 완료 후 로딩 상태 해제
                }
            }
        };

        fetchData();
    }, [data]);

    const handleCopyLink = () => {
        const baseUrl = window.location.origin;
        const searchPageUrl = `${baseUrl}/myname`;

        navigator.clipboard.writeText(searchPageUrl).then(() => {
            setIsAlertVisible(true);
            setTimeout(() => setIsAlertVisible(false), 2000); // 2초 후 알림 숨김
        }, (err) => {
            console.error('링크 복사 실패: ', err);
        });
    };

    const handleGoToMyName = () => {
        router.push('/activist');
    };



    return (
        <div className="flex flex-col h-screen bg-gray-100 p-4">
            <Navigation />

            <div className="flex flex-col items-center flex-1 px-4">
                <h1 className="text-xl text-blue-400 font-bold mb-1 text-center"> 광복절의 의미, 우리의 이름 🇰🇷</h1>
                <h1 className="text-xl text-blue-500 font-bold mb-4 text-center">우리의 이름과 정체성이 계속되도록.</h1>

                <img
                    className="w-full p-3 max-w-md bg-white p-2 rounded-t-lg shadow-md"
                    src="/815.jpg"
                    alt="광복절 이미지"
                />

                {loading ? (
                    <div className="w-full max-w-md bg-white p-6 shadow-md text-center">
                        <p className="text-lg font-bold text-gray-700 mb-4">데이터를 가져오는 중입니다...</p>
                        <div className="loader"> {/* 프로그레스 링 */}
                            <div className="spinner-border animate-spin"></div>
                        </div>
                    </div>
                ) : error ? (
                    <div className="w-full max-w-md bg-red-100 p-6 shadow-md text-center">
                        <h3 className="text-lg font-bold text-red-600">오류:</h3>
                        <p>{error}</p>
                    </div>
                ) : apiResponse ? (
                    <div className="w-full max-w-md bg-white p-6 shadow-md text-center">
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">당신의 이름은</h2>
                        <pre className="text-2xl mb-2">{apiResponse["surName"]} {apiResponse["firstName"]} </pre>
                        <pre
                            className="text-lg mb-2">{apiResponse["pronounceSurName"]} {apiResponse["pronounceFirstName"]}</pre>
                        {apiResponse["households"] === 9999 ? (
                            <pre className="font-bold mb-2"> 몇 가구가 사용중인 성씨인지 <br/>집계되지 않았어요.😰</pre>
                        ) : (
                            <pre
                                className="font-bold mb-2">현재 일본 내 대략 {apiResponse["households"]} 가구가 <br/>쓰고 있는 성씨입니다.</pre>
                        )}
                        {apiResponse["eg"] === undefined ? (
                            <pre className="font-bold mb-2"> </pre>

                        ) : (
                            <pre className="font-bold mb-2"> {apiResponse["eg"]}사람들이 자신의 성씨를<br/>잊지않기 위해 갖게된 성씨에요.</pre>
                        )}

                        <p className="mt-4 text-sm p-2 text-white bg-gray-600 rounded-2xl">
                            이 이름은 일본 식민 지배 시기에 강제로 바뀐 것입니다. <br/>
                            광복 덕분에 우리 자유로운 이름을 되찾을 수 있었습니다. <br/>
                            역사를 기억하고 잊지 맙시다.
                        </p>

                    </div>
                ) : (
                    <div className="w-full max-w-md bg-white p-6 shadow-md text-center">
                        <p className="text-lg font-bold text-gray-700 mb-4">응답 데이터가 없습니다.</p>
                    </div>
                )}

                <div className="w-full p-3 max-w-md bg-white p-2 rounded-b-lg shadow-md text-center">
                    <button className="w-full my-2 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-lg"
                            onClick={() => router.back()}>
                        다시 찾기
                    </button>
                    <button
                        className="w-full my-2 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 text-lg"
                        onClick={handleCopyLink}
                    >
                        링크 복사하기
                    </button>
                    <button
                        className="w-full my-2 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 text-lg"
                        onClick={handleGoToMyName}
                    >
                        나 이름과 비슷한 독립운동가?🇰🇷
                    </button>

                </div>
            </div>
            <LikeButton/>
            <AlertPopup
                message="링크가 클립보드에 복사되었습니다!"
                isVisible={isAlertVisible}
            />
            <Footer githubUrl="https://github.com/Camof1ow"/>

        </div>
    );
};

export default FormPage;
