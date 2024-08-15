"use client";

import React, {useState, useEffect} from 'react';
import {usePathname} from 'next/navigation';
import Modal from '../Modal';

interface RepairRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitSuccess: () => void;
    dataObj: { [key: string]: any } | null;
}

const RepairRequestModal: React.FC<RepairRequestModalProps> = ({isOpen, onClose, onSubmitSuccess, dataObj}) => {
    const pathname = usePathname();
    const [requestData, setRequestData] = useState<string>('');
    const [requestMessage, setRequestMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [page, setPage] = useState<string>('');

    useEffect(() => {
        if (pathname && pathname.includes('/myname')) {
            setPage('NAME');
        } else if (pathname && pathname.includes('/activist')) {
            setPage('ACTIVIST');
        } else {
            setPage('');
        }
    }, [pathname]);

    const handleSubmit = async () => {
        const repairRequestDto = {
            page,
            requestData: JSON.stringify(dataObj),
            requestMessage,
            createdAt: new Date().toISOString(),
        };

        setIsSubmitting(true);

        try {
            const response = await fetch('/backend/api/repair', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(repairRequestDto),
            });

            const data = await response.json();
            if (data.code === 1) {
                onSubmitSuccess();
            } else {
                alert('잠시 후 다시 시도해주세요😰');
            }
        } catch (error) {
            alert('오류가 있습니다. 잠시 후 다시 시도해주세요🥵');
        } finally {
            setIsSubmitting(false);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-semibold mb-4">문제가 있으신가요? 🛠</h2>
            <div className="space-y-4">
                <label className="block">
                    겪고 계신 문제를 남겨주세요
                    <input
                        type="text"
                        value={requestMessage}
                        onChange={(e) => setRequestMessage(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </label>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
                <button
                    onClick={handleSubmit}
                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? '제출 중...' : '제출'}
                </button>
                <button
                    onClick={onClose}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                    닫기
                </button>
            </div>
        </Modal>
    );
};

export default RepairRequestModal;
