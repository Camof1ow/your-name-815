import React, { useState } from 'react';

interface Option {
    value: string;
    label: string;
}

interface SelectBoxProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    index: number; // 인덱스 추가
}

const SelectBox: React.FC<SelectBoxProps> = ({ options, value, onChange, placeholder, index }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSelectChange = (value: string) => {
        onChange(value);
        setIsOpen(false); // 선택 후 드롭다운을 닫음
    };

    return (
        <div className="relative w-full max-w-xs">
            {/* Input */}
            <div className="flex items-center border border-gray-200 rounded-md bg-white">
                <button
                    type="button"
                    className="w-full p-2 text-center text-gray-900 bg-white border border-gray-200 rounded-md flex justify-center items-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span>{value || placeholder}</span>
                </button>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="absolute z-10 mt-1 text-start w-full max-h-60 overflow-y-auto border border-gray-200 bg-white rounded-md shadow-lg">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="cursor-pointer p-2 hover:bg-gray-300"
                            onClick={() => handleSelectChange(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectBox;
