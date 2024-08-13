// context/GlobalContext.tsx
"use client"; // 클라이언트 사이드에서만 사용되도록 지시

import React, { createContext, useState, useContext, ReactNode } from 'react';

// 데이터 타입 정의
interface Data {
    firstName: string;
    lastName: string;
    gender: string;
}

interface SimpleName {
    name: string;
}

// Context 타입 정의
interface GlobalContextType {
    data: Data | null;
    setData: (data: Data) => void;
    simpleName: SimpleName | null;
    setSimpleName: (simpleName: SimpleName) => void;
}

// 기본값
const defaultContext: GlobalContextType = {
    data: null,
    setData: () => {},
    simpleName: null,
    setSimpleName: () => {},
};

// Context 생성
const GlobalContext = createContext<GlobalContextType>(defaultContext);

// Provider 컴포넌트
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<Data | null>(null);
    const [simpleName, setSimpleName] = useState<SimpleName | null>(null);

    return (
        <GlobalContext.Provider value={{ data, setData, simpleName, setSimpleName }}>
            {children}
        </GlobalContext.Provider>
    );
};


// Custom Hook
export const useGlobalContext = () => useContext(GlobalContext);
