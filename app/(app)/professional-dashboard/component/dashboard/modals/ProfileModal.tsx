import Modal from '@/components/Modal';
import React from 'react'
import ProfileScreen from '../screens/ProfileScreen';
import { useModalStore } from '@/store/modalStore';

const ProfileModal = () => {
    const { isModalOpen, modalKey, openModal, closeModal } = useModalStore();

    return (
        <Modal isOpen={isModalOpen && modalKey === "פרופיל"} onClose={closeModal}>
            <ProfileScreen toggleScreen={closeModal} />
        </Modal>
    )
}

export default ProfileModal
