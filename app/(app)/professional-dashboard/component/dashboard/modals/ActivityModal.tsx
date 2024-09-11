import Modal from '@/components/Modal';
import React from 'react'
import { useModalStore } from '@/store/modalStore';
import ActivityScreen from '../screens/ActivityScreen';

const ActivityModal = () => {
    const { isModalOpen, modalKey, closeModal } = useModalStore();

    return (
        <Modal isOpen={isModalOpen && modalKey === "שעות פעילות"} onClose={closeModal}>
            <ActivityScreen toggleScreen={closeModal} />
        </Modal>
    )
}

export default ActivityModal
