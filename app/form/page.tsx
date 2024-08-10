"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import * as d3 from 'd3';

interface Result {
    firstName: string;
    lastName: string;
    gender: string;
}

interface HanjaData {
    hanja: string;
    meaning: string;
    main_sound: string;
    level: string;
    radical: string;
    strokes: number;
    total_strokes: number;
}

interface Option {
    value: string;
    label: string;
}

export default function FormPage() {
    const [inputValue, setInputValue] = useState<string>('');
    const [hanjaData, setHanjaData] = useState<HanjaData[]>([]);
    const [selectBoxes, setSelectBoxes] = useState<{ [index: number]: string }>({});
    const [filteredOptions, setFilteredOptions] = useState<{ [index: number]: Option[] }>([]);

    // 데이터를 불러오는 함수
    async function loadHanjaData() {
        try {
            const data = await d3.csv('/hanja.csv');
            return data.map(d => ({
                hanja: d.hanja,
                meaning: d.meaning,
                main_sound: d.main_sound,
                level: d.level,
                radical: d.radical,
                strokes: +d.strokes,
                total_strokes: +d.total_strokes
            }));
        } catch (error) {
            console.error('Error loading CSV data:', error);
            return [];
        }
    }

    // 데이터 로딩 및 필터링
    useEffect(() => {
        async function fetchData() {
            const data = await loadHanjaData();
            setHanjaData(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const stringArray = inputValue.split('');
        const optionsObj: { [index: number]: Option[] } = {};

        stringArray.forEach((char, index) => {
            const options = hanjaData
                .filter(item => item.main_sound === char)
                .map(item => ({
                    value: item.hanja,
                    label: `${item.hanja} (${item.meaning.replace(/[\[\]\'\"]/g, '')})`
                }));
            optionsObj[index] = options;
        });
        setFilteredOptions(optionsObj);
    }, [inputValue, hanjaData]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSelectChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSelectBoxes = { ...selectBoxes, [index]: event.target.value };
        setSelectBoxes(newSelectBoxes);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // 폼 제출을 처리하는 로직을 여기에 추가합니다.
        console.log('Submitted values:', selectBoxes);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 p-4">
            {/* 네비게이션 탭 */}
            <nav className="flex space-x-4 mb-6">
                <Link href="/form" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                    폼
                </Link>
                <Link href="/another-page" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                    다른 페이지
                </Link>
            </nav>

            {/* 폼 */}
            <div className="flex flex-col items-center justify-center flex-1">
                <h1 className="text-2xl text-blue-600 font-bold mb-4">광복이 없었더라면?</h1>
                <h1 className="text-xl text-blue-600 font-bold mb-4">과연 내 이름은...</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                    <label className="block mb-4">
                        <span className="text-gray-700">이름을 입력해주세요.</span>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            placeholder="이름을 입력하세요"
                        />
                        <div className="flex flex-row flex-wrap gap-2 mt-4">
                            {Array.from({ length: inputValue.length }).map((_, index) => (
                                <div key={index} className="flex-1 min-w-[100px]">
                                    <label className="block">
                                        <span className="text-gray-700">글자 {index + 1}:</span>
                                        <select
                                            onChange={(e) => handleSelectChange(index, e)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                            value={selectBoxes[index] || ''}
                                        >
                                            <option value="">한자를 선택하세요</option>
                                            {filteredOptions[index]?.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </label>
                    <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        제출
                    </button>
                </form>
            </div>
        </div>
    );
}
