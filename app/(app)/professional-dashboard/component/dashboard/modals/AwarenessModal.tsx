import Modal from '@/components/Modal';
import React from 'react'
import { useModalStore } from '@/store/modalStore';
import AwarenessScreen from '../screens/AwarenessScreen';

const AwarenessModal = () => {
    const { isModalOpen, modalKey, openModal, closeModal } = useModalStore();

    return (
        <Modal isOpen={isModalOpen && modalKey === "מודעות"} onClose={closeModal}>
            <AwarenessScreen toggleScreen={closeModal} />
        </Modal>
    )
}

export default AwarenessModal
