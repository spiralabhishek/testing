import Modal from '@/components/Modal';
import React from 'react'
import { useModalStore } from '@/store/modalStore';
import PriceListScreen from '../screens/PriceListScreen';

const PriceListModal = () => {
    const { isModalOpen, modalKey, openModal, closeModal } = useModalStore();

    return (
        <Modal isOpen={isModalOpen && modalKey === "מחירון"} onClose={closeModal}>
            <PriceListScreen toggleScreen={closeModal} />
        </Modal>
    )
}

export default PriceListModal
