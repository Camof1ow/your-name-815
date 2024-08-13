// app/myname/page.tsx
"use client"; // 클라이언트 컴포넌트로 명시

import { useGlobalContext } from '@/context/GlobalContext';
import Navigation from '@/components/Navigation'; // 네비게이션 탭을 임포트

const FormPage = () => {
    const { data } = useGlobalContext(); // GlobalContext에서 데이터 가져오기

    if (!data) {
        return <p>Loading...</p>;
    }

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

                <div className="w-full max-w-md bg-white p-6 rounded-b-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">입력한 정보</h2>
                    <p className="text-lg text-gray-600 mb-2">성: <span className="font-bold text-blue-500">{data.lastName}</span></p>
                    <p className="text-lg text-gray-600 mb-2">이름: <span className="font-bold text-blue-500">{data.firstName}</span></p>
                    <p className="text-lg text-gray-600 mb-2">성별: <span className="font-bold text-blue-500">{data.gender === 'male' ? '남성' : '여성'}</span></p>
                </div>
            </div>
        </div>
    );
};

export default FormPage;
