import Modal from '@/components/Modal';
import React from 'react'
import { useModalStore } from '@/store/modalStore';
import AssetManagementScreen from '../screens/AssetManagementScreen';

const AssetManagementModal = () => {
    const { isModalOpen, modalKey, openModal, closeModal } = useModalStore();

    return (
        <Modal isOpen={isModalOpen && modalKey === "ניהול נכסים"} onClose={closeModal}>
            <AssetManagementScreen toggleScreen={closeModal} />
        </Modal>
    )
}

export default AssetManagementModal
