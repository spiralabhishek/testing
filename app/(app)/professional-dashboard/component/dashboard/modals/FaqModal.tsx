import Modal from '@/components/Modal';
import React from 'react'
import { useModalStore } from '@/store/modalStore';
import FaqScreen from '../screens/FaqScreen';

const FaqModal = () => {
    const { isModalOpen, modalKey, openModal, closeModal } = useModalStore();

    return (
        <Modal isOpen={isModalOpen && modalKey === "שאלות נפוצות"} onClose={closeModal}>
            <FaqScreen toggleScreen={closeModal} />
        </Modal>
    )
}

export default FaqModal
