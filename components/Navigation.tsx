// components/Navigation.tsx
import React, { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Navigation = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleNavigation = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="relative">
            {/* 네비게이션 버튼 */}
            <button
                onClick={toggleNavigation}
                className={`absolute top-4 left-1/2 transform -translate-x-1/2 p-2 bg-blue-400 text-white rounded-full shadow-md hover:bg-blue-600 transition-transform duration-300 ease-in-out ${
                    isVisible ? "translate-y-16" : "translate-y-0"
                }`}
            >
                {isVisible ? (
                    <FaChevronUp className="w-6 h-6"/>
                ) : (
                    <FaChevronDown className="w-6 h-6"/>
                )}
            </button>

            {/* 네비게이션 */}
            <nav
                className={`flex justify-between items-center space-x-6 mb-6 overflow-x-auto transition-transform duration-300 ease-in-out w-4/5 max-w-screen-lg mx-auto ${
                    isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
                }`}
            >
                <Link
                    href="/myname"
                    className="flex-1 px-6 py-3 bg-blue-500 bg-opacity-70 rounded-md text-white hover:bg-opacity-80 hover:bg-blue-600 transition-opacity duration-300 text-center"
                >
                    과연 내 이름은?
                </Link>
                <Link
                    href="/activist"
                    className="flex-1 px-6 py-3 bg-blue-500 bg-opacity-70 rounded-md text-white hover:bg-opacity-80 hover:bg-blue-600 transition-opacity duration-300 text-center"
                >
                    독립운동가 찾기
                </Link>
            </nav>
        </div>
    );
};

export default Navigation;
