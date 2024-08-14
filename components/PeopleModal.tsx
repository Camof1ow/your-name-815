// components/Modal.tsx
import React, { useRef, useEffect } from 'react';

interface PeopleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOutsideClick: () => void;
    content: {
        name: string;
        image: string;
        details: string;
    } | null;
}

const PeopleModal: React.FC<PeopleModalProps> = ({ isOpen, onClose, onOutsideClick, content }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onOutsideClick();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onOutsideClick]);

    if (!isOpen || !content) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div ref={modalRef} className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">{content.name}</h2>
                <img
                    src={`/activists/${content.image}`}
                    alt={content.name}
                    className="w-full h-auto max-h-48 object-contain mb-4 rounded"
                />
                <p className="whitespace-pre-line">{content.details}</p>
                <button
                    onClick={onClose}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    닫기
                </button>
            </div>
        </div>
    );
};

export default PeopleModal;