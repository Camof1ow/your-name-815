"use client";

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation'; // 네비게이션 컴포넌트 임포트
import Modal from '@/components/Modal';
import * as d3 from 'd3';

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
    const [filteredOptions, setFilteredOptions] = useState<{ [index: number]: Option[] }>({});
    const [firstNameHanja, setFirstNameHanja] = useState<string[]>([]);
    const [lastNameHanja, setLastNameHanja] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [gender, setGender] = useState<string>(''); // 성별 상태 추가

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

    useEffect(() => {
        async function fetchData() {
            const data = await loadHanjaData();
            setHanjaData(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const stringArray = inputValue.split(' ');
        const optionsObj: { [index: number]: Option[] } = {};
        let selectBoxIndex = 0;

        stringArray.forEach(part => {
            const charArray = part.split('');
            charArray.forEach((char, index) => {
                const options = hanjaData
                    .filter(item => item.main_sound === char)
                    .map(item => ({
                        value: item.hanja,
                        label: `${item.hanja} (${item.meaning.replace(/[\[\]\'\"]/g, '')})`
                    }));
                optionsObj[selectBoxIndex * 10 + index] = options;
            });
            selectBoxIndex++;
        });

        setFilteredOptions(optionsObj);
    }, [inputValue, hanjaData]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSelectChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSelectBoxes = { ...selectBoxes, [index]: event.target.value };
        setSelectBoxes(newSelectBoxes);
        setEditIndex(null); // 선택 후 셀렉트 박스를 숨깁니다.
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const stringArray = inputValue.split(' ');
        if (stringArray.length < 2) {
            setIsModalOpen(true);
            return;
        }
        const lastNameLength = stringArray[0].length;

        const newLastNameHanja = Object.entries(selectBoxes)
            .filter(([index]) => parseInt(index) < lastNameLength)
            .sort(([a], [b]) => parseInt(a) - parseInt(b))
            .map(([, value]) => value);

        const newFirstNameHanja = Object.entries(selectBoxes)
            .filter(([index]) => parseInt(index) >= lastNameLength)
            .sort(([a], [b]) => parseInt(a) - parseInt(b))
            .map(([, value]) => value);

        setFirstNameHanja(newFirstNameHanja);
        setLastNameHanja(newLastNameHanja);

        // 성과 이름을 기반으로 데이터를 반환하는 로직 추가
        console.log('Submitted values:', {
            firstName: newFirstNameHanja.join(''),
            lastName: newLastNameHanja.join('')
        });
    };

    const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(event.target.value);
    };

    // 각 행에 들어갈 셀렉트 박스의 수를 결정합니다.
    const calculateRows = () => {
        const numChars = inputValue.replace(/ /g, '').length;
        const numRows = Math.ceil(numChars / 3);
        return numRows;
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 p-4">
            <Navigation /> {/* 네비게이션 탭을 여기에 추가 */}

            <div className="flex flex-col items-center justify-center flex-1 px-4">
                <h1 className="text-2xl text-blue-600 font-bold mb-4 text-center">광복이 없었더라면?</h1>
                <h1 className="text-xl text-blue-600 font-bold mb-4 text-center">과연 내 이름은...</h1>

                <img className="w-full max-w-md bg-white p-6 rounded-t-lg shadow-md" src="/815.jpg" alt={"광복절 이미지"}></img>
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-b-lg shadow-md">
                    <label className="block mb-4">
                        <span className="text-pink-400"> 성과 이름을 띄어쓰기로 구분해주세요. </span>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-lg"
                            placeholder="이름을 입력하세요"
                        />
                        <div className={`grid grid-cols-3 gap-4 mt-4 ${calculateRows() > 1 ? 'grid-rows-2' : ''}`}>
                            {inputValue.split(' ').flatMap((part, partIndex) =>
                                part.split('').map((char, charIndex) => {
                                    const selectBoxIndex = partIndex * 10 + charIndex;
                                    return (
                                        <div key={selectBoxIndex} className="relative min-w-[100px]">
                                            {editIndex === selectBoxIndex ? (
                                                <select
                                                    onChange={(e) => handleSelectChange(selectBoxIndex, e)}
                                                    onBlur={() => setEditIndex(null)} // 포커스 아웃 시 셀렉트 박스를 숨깁니다.
                                                    className="block w-full border border-gray-300 rounded-md p-3 text-lg"
                                                    value={selectBoxes[selectBoxIndex] || ''}
                                                >
                                                    <option value="" disabled>{char}</option>
                                                    {filteredOptions[selectBoxIndex]?.map(option => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <div
                                                    className="flex items-center justify-center border border-gray-300 rounded-md p-3 text-lg cursor-pointer"
                                                    onClick={() => setEditIndex(selectBoxIndex)}
                                                >
                                                    {selectBoxes[selectBoxIndex] || char}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </label>

                    {/* 성별 선택 셀렉트 박스 추가 */}
                    <label className="block mb-4">
                        <span className="text-gray-700">성별을 선택해주세요.</span>
                        <select
                            value={gender}
                            onChange={handleGenderChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-lg"
                        >
                            <option value="" disabled>성별을 선택하세요</option>
                            <option value="boy">남성</option>
                            <option value="girl">여성</option>
                        </select>
                    </label>

                    <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-lg">
                        제출
                    </button>
                </form>
            </div>

            {/* 모달 컴포넌트 */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="입력 오류"
            >
                <p className="text-gray-700">이름을 성과 이름으로 구분하기 위해 공백을 포함시켜 주세요.</p>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    확인
                </button>
            </Modal>
        </div>
    );
}
