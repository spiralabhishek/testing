import Modal from '@/components/Modal';
import React from 'react'
import { useModalStore } from '@/store/modalStore';
import ShareScreen from '../screens/ShareScreen';

const ShareModal = () => {
    const { isModalOpen, modalKey, openModal, closeModal } = useModalStore();

    return (
        <Modal isOpen={isModalOpen && modalKey === "שיתוף"} onClose={closeModal}>
            <ShareScreen toggleScreen={closeModal} />
        </Modal>
    )
}

export default ShareModal
