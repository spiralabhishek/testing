import Modal from '@/components/Modal';
import React from 'react'
import { useModalStore } from '@/store/modalStore';
import TeamScreen from '../screens/TeamScreen';

const TeamModal = () => {
    const { isModalOpen, modalKey, closeModal } = useModalStore();

    return (
        <Modal isOpen={isModalOpen && modalKey === "צוות"} onClose={closeModal}>
            <TeamScreen toggleScreen={closeModal} />
        </Modal>
    )
}

export default TeamModal
