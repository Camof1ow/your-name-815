"use client";

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/context/GlobalContext'; // named import로 수정
import Navigation from '@/components/Navigation';
import Modal from '@/components/Modal';
import SelectBox from "@/components/SelectBox";
import GenderSelect from "@/components/GenderSelect";
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

interface Modal {
    isOpen: boolean;
    body: string;
}

const defaultModalState: Modal = {
    isOpen: false,
    body: ''
};

export default function FormPage() {
    const [inputValue, setInputValue] = useState<string>('');
    const [hanjaData, setHanjaData] = useState<HanjaData[]>([]);
    const [selectBoxes, setSelectBoxes] = useState<string[]>([]);
    const [filteredOptions, setFilteredOptions] = useState<{ [index: number]: Option[] }>({});
    const [firstNameHanja, setFirstNameHanja] = useState<string[]>([]);
    const [lastNameHanja, setLastNameHanja] = useState<string[]>([]);
    const [modal, setModal] = useState<Modal>(defaultModalState);
    const [selectedGender, setSelectedGender] = useState<string>('');
    const router = useRouter();
    const { setData } = useGlobalContext();


    const handleModalClose = () => {
        setModal(defaultModalState);
    };


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
        const value = event.target.value;
        setInputValue(value);
        const boxes = value.split('').filter(char => char.trim() !== '');
        setSelectBoxes(new Array(boxes.length).fill(''));
    };

    const handleSelectChange = (index: number, value: string) => {
        const newSelectBoxes = [...selectBoxes];
        newSelectBoxes[index] = value;
        setSelectBoxes(newSelectBoxes);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const stringArray = inputValue.split(' ');
        if (stringArray.length < 2) {
            setModal({
                isOpen: true,
                body: '성과 이름 사이 공백을 포함시켜주세요.'
            });
            return;
        } else if (selectedGender === '') {
            setModal({
                isOpen: true,
                body: '성별을 체크해주세요.'
            });
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


        const data = {
            firstName: newFirstNameHanja.join(''),
            lastName: newLastNameHanja.join(''),
            gender: selectedGender
        };
        setData(data); // Context에 데이터 저장
        router.push('/myname/result');

    };

    const genderOptions = [
        {value: 'male', label: '남성'},
        {value: 'female', label: '여성'},
    ];

    const handleGenderChange = (value: string) => {
        let gender = "";
        if (value === '남성') {
            gender = "male";
        } else if (value === '여성') {
            gender = "female";
        } else {
            return
        }
        setSelectedGender(gender);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 p-4">
            <Navigation/> {/* 네비게이션 탭을 여기에 추가 */}

            <div className="flex flex-col items-center flex-1 px-4">
                <h1 className="text-xl text-blue-400 font-bold mb-1 text-center">광복이 없었더라면</h1>
                <h1 className="text-2xl text-blue-500 font-bold mb-4 text-center">과연 내 이름은?</h1>

                <img className="w-full p-3 max-w-md bg-white rounded-t-lg shadow-md" src="/815.jpg"
                     alt={"광복절 이미지"}></img>
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-b-lg shadow-md">
                    <label className="block mb-4 text-center">
                        <span className="font-bold text-pink-400">성과 이름을 띄어쓰기로 구분해주세요.</span>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="mt-4 p-2 block w-full border border-gray-300 rounded-md text-lg text-center"
                            placeholder="이름을 입력하세요"
                        />
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {inputValue.split('')
                                .filter(char => char.trim() !== '')
                                .map((char, index) => {
                                    const options = hanjaData
                                        .filter(item => item.main_sound === char)
                                        .map(item => ({
                                            value: item.hanja,
                                            label: `${item.hanja} (${item.meaning.replace(/[\[\]\'\"]/g, '')})`
                                        }));

                                    return (
                                        <SelectBox
                                            key={index}
                                            options={options}
                                            value={selectBoxes[index] || ''}
                                            onChange={(value) => handleSelectChange(index, value)}
                                            placeholder={char}
                                            index={index} // 인덱스 전달
                                        />
                                    );
                                })}
                        </div>

                        <GenderSelect
                            options={genderOptions}
                            value={selectedGender}
                            onChange={handleGenderChange}
                            placeholder="성별을 선택하세요"
                        />

                    </label>

                    <button type="submit"
                            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-lg">
                        확인
                    </button>
                </form>
            </div>

            {/* 모달 컴포넌트 */}
            <Modal
                isOpen={modal.isOpen}
                onClose={handleModalClose}
            >
                <p className="text-gray-700 text-center leading-relaxed">{modal.body}</p>
                <button
                    onClick={() => {
                        setModal(defaultModalState)
                    }}
                    className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    알겠습니다.
                </button>
            </Modal>
        </div>
    );
}
