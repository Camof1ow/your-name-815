// app/not-found.tsx
"use client"; // 클라이언트 컴포넌트로 명시

import {useRouter} from 'next/navigation';
import React from 'react';

export default function NotFound() {
    const router = useRouter();

    const handleGoHome = () => {
        router.push('/');
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            {/* 공사장 이미지 */}
            <img
                src="/construction.jpeg" // 이미지 경로를 프로젝트의 public 폴더에 맞게 설정하세요.
                alt="공사 중"
                className="w-1/2 max-w-md mb-4"
            />

            <h1 className="text-4xl font-bold text-gray-700 mb-2">🔨준비 중입니다!🔨</h1>
            <p className="text-xl text-gray-500 mb-4">금방 만들겠습니다.</p>

            <button
                onClick={handleGoHome}
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                홈으로 돌아가기
            </button>
        </div>
    );
}