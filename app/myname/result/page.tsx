"use client"; // 클라이언트 컴포넌트로 명시

import { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';
import Navigation from '@/components/Navigation';
import { useRouter } from 'next/navigation';

const FormPage = () => {
    const { data } = useGlobalContext();
    const [apiResponse, setApiResponse] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter(); // useRouter 사용

    useEffect(() => {
        const fetchData = async () => {
            if (data) {
                setLoading(true); // 시작 시 로딩 상태 설정
                try {
                    const response = await fetch(`${process.env.BE_API_URL}/api/name?firstName=${data.firstName}&lastName=${data.lastName}&gender=${data.gender}`);
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

    return (
        <div className="flex flex-col h-screen bg-gray-100 p-4">
            <Navigation /> {/* 네비게이션 탭을 여기에 추가 */}

            <div className="flex flex-col items-center flex-1 px-4">
                <h1 className="text-xl text-blue-400 font-bold mb-1 text-center">광복이 없었더라면</h1>
                <h1 className="text-2xl text-blue-500 font-bold mb-4 text-center">과연 내 이름은?</h1>

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
                        <pre className="text-lg mb-2">{apiResponse["pronounceSurName"]} {apiResponse["pronounceFirstName"]}</pre>
                        <pre className="text-lg mb-2">현재 일본 내 대략 {apiResponse["households"]} 가구가 <br/>쓰고 있는 성씨입니다.</pre>
                    </div>
                ) : (
                    <div className="w-full max-w-md bg-white p-6 shadow-md text-center">
                        <p className="text-lg font-bold text-gray-700 mb-4">응답 데이터가 없습니다.</p>
                    </div>
                )}

                <div className="w-full p-3 max-w-md bg-white p-2 rounded-b-lg shadow-md text-center">
                    <button className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-lg"
                            onClick={() => router.back()}>
                        다시 짓기
                    </button>

                </div>
            </div>


        </div>
    );
};

export default FormPage;
