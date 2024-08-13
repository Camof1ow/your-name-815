import React, {useState} from 'react';

interface Option {
    value: string;
    label: string;
}

interface SelectBoxProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const GenderSelect: React.FC<SelectBoxProps> = ({options, value, onChange, placeholder}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSelectChange = (value: string) => {
        onChange(value);
        setIsOpen(false); // 선택 후 드롭다운을 닫음
    };

    return (
        <div className="relative w-full mt-4">
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
                    className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto border border-gray-200 bg-white rounded-md shadow-lg">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="cursor-pointer p-2 hover:bg-teal-100"
                            onClick={() => handleSelectChange(option.label)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GenderSelect;
