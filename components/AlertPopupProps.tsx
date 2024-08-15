import React from 'react';

interface AlertPopupProps {
    message: string;
    isVisible: boolean;
}

const AlertPopup: React.FC<AlertPopupProps> = ({ message, isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm w-full mx-4">
                <p className="text-center text-gray-800">{message}</p>
            </div>
        </div>
    );
};

export default AlertPopup;
