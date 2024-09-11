import Modal from '@/components/Modal';
import React from 'react'
import { useModalStore } from '@/store/modalStore';
import BannerScreen from '../screens/BannerScreen';

const BannerModal = () => {
    const { isModalOpen, modalKey, openModal, closeModal } = useModalStore();

    return (
        <Modal isOpen={isModalOpen && modalKey === "באנר"} onClose={closeModal}>
            <BannerScreen toggleScreen={closeModal} />
        </Modal>
    )
}

export default BannerModal
