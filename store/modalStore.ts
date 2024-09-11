import { create } from 'zustand';

interface ModalState {
    isModalOpen: boolean;
    modalKey: string | null;
    openModal: (type: string) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isModalOpen: false,
    modalKey: null,
    openModal: (type: string) => set({ isModalOpen: true, modalKey: type }),
    closeModal: () => set({ isModalOpen: false, modalKey: null }),
}));
