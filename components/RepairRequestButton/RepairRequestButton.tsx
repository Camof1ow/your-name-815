import React, {useEffect, useState} from 'react';
import RepairRequestModal from './RepairRequestModal';
import AlertPopup from "@/components/AlertPopupProps";

interface RepairRequestProps {
    dataObj: { [key: string]: any } | null;
}

const RepairRequestButton: React.FC<RepairRequestProps> = ({dataObj}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);
    useEffect(()=>{

    })
    const handleSubmitSuccess = () => {
        setAlertMessage('정상적으로 접수 되었습니다.');
        setIsAlertVisible(true);
        setTimeout(() => setIsAlertVisible(false), 2000); // 2초 후 알림 숨김
    };
    return (
        <>
            <button
                className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center text-2xl shadow-lg hover:bg-red-600 z-50"
                onClick={handleModalOpen}
            >
                🛠
            </button>
            <RepairRequestModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmitSuccess={handleSubmitSuccess}
                dataObj={dataObj}
            />

            <AlertPopup
                message={alertMessage}
                isVisible={isAlertVisible}
            />
        </>
    );
};

export default RepairRequestButton;
