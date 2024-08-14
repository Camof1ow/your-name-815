"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/context/GlobalContext';
import Modal from '@/components/Modal';
import GenderSelect from "@/components/GenderSelect";
import * as d3 from 'd3';
import Footer from "@/components/Footer";

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

const defaultOptionState: Option = {
    value: '',
    label: ''
};

export default function FormPage() {
    const [lastName, setLastName] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [hanjaData, setHanjaData] = useState<HanjaData[]>([]);
    const [filteredLastNameOptions, setFilteredLastNameOptions] = useState<Option[][]>([]);
    const [filteredFirstNameOptions, setFilteredFirstNameOptions] = useState<Option[][]>([]);
    const [modal, setModal] = useState<Modal>(defaultModalState);
    const [selectedGender, setSelectedGender] = useState<Option>(defaultOptionState);
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
        const lastNameOptions = lastName.split('').map(char =>
            hanjaData
                .filter(item => item.main_sound === char)
                .map(item => ({
                    value: item.hanja,
                    label: `${item.hanja} (${item.meaning.replace(/[\[\]\'\"]/g, '')})`
                }))
        );
        setFilteredLastNameOptions(lastNameOptions);
    }, [lastName, hanjaData]);

    useEffect(() => {
        const firstNameOptions = firstName.split('').map(char =>
            hanjaData
                .filter(item => item.main_sound === char)
                .map(item => ({
                    value: item.hanja,
                    label: `${item.hanja} (${item.meaning.replace(/[\[\]\'\"]/g, '')})`
                }))
        );
        setFilteredFirstNameOptions(firstNameOptions);
    }, [firstName, hanjaData]);

    const handleSelectChange = (index: number, value: string, type: 'lastName' | 'firstName') => {
        const currentValue = type === 'lastName' ? lastName : firstName;
        const newValue = currentValue.split('');
        newValue[index] = value;
        const updatedValue = newValue.join('');

        if (type === 'lastName') {
            setLastName(updatedValue);
        } else {
            setFirstName(updatedValue);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!lastName || !firstName) {
            setModal({
                isOpen: true,
                body: '성과 이름을 모두 입력해주세요.'
            });
            return;
        } else if (selectedGender.value === '') {
            setModal({
                isOpen: true,
                body: '성별을 체크해주세요.'
            });
            return;
        }

        const data = {
            firstName,
            lastName,
            gender: selectedGender.value
        };
        setData(data); // Context에 데이터 저장
        router.push('/myname/result');
    };

    const genderOptions = [
        { value: 'male', label: '남성' },
        { value: 'female', label: '여성' },
    ];

    const handleGenderChange = (value: Option) => {
        setSelectedGender(value);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 p-4">

            <div className="flex flex-col items-center flex-1 px-4">
                <h1 className="text-xl text-blue-400 font-bold mb-1 text-center">광복이 없었더라면</h1>
                <h1 className="text-2xl text-blue-500 font-bold mb-4 text-center">과연 내 이름은?</h1>

                <img className="w-full p-3 max-w-md bg-white rounded-t-lg shadow-md" src="/815.jpg" alt="광복절 이미지" />

                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-b-lg shadow-md relative">
                    <label className="block mb-4 text-center">
                        <span className="font-bold my-2 text-pink-400">성과 이름을 입력해주세요.</span>
                        <div className="relative flex gap-2 mb-4">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-md text-lg text-center w-full"
                                    placeholder="성"
                                />
                                {lastName && (
                                    <div
                                        className="absolute top-full left-0 mt-1 bg-white rounded-lg w-full max-h-60 overflow-y-auto z-10">
                                        {filteredLastNameOptions.map((options, index) => (
                                            <div key={index} className="relative">
                                                {options.map(option => (
                                                    <div
                                                        key={option.value}
                                                        className="p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-200"
                                                        onClick={(event) => {
                                                            event.preventDefault(); // 기본 동작 막기
                                                            handleSelectChange(index, option.value, 'lastName');
                                                        }}
                                                    >
                                                        {option.label}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-md text-lg text-center w-full"
                                    placeholder="이름"
                                />
                                {firstName && (
                                    <div
                                        className="absolute top-full left-0 mt-1 bg-white rounded-lg w-full max-h-60 overflow-y-auto z-10">
                                        {filteredFirstNameOptions.map((options, index) => (
                                            <div key={index} className="relative">
                                                {options.map(option => (
                                                    <div
                                                        key={option.value}
                                                        className="p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-200"
                                                        onClick={(event) => {
                                                            event.preventDefault(); // 기본 동작 막기
                                                            handleSelectChange(index, option.value, 'firstName')}}
                                                    >
                                                        {option.label}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
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

            <Modal isOpen={modal.isOpen} onClose={handleModalClose}>
                <p className="text-gray-700 text-center leading-relaxed">{modal.body}</p>
                <button
                    onClick={handleModalClose}
                    className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    알겠습니다.
                </button>
            </Modal>

            <Footer githubUrl="https://github.com/Camof1ow" />

        </div>
    );
}
