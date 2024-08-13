// components/Modal.tsx
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: {
        name: string;
        image: string;
        details: string;
    } | null;
}

const PeopleModal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
    if (!isOpen || !content) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                    &times;
                </button>
                <img
                    src= "/none_profile.png"
                    alt={content.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
                <h2 className="text-xl font-bold text-gray-800 mt-4">{content.name}</h2>
                <p className="text-gray-600 mt-2">{content.details}</p>
            </div>
        </div>
    );
};

export default PeopleModal;
