"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useModalStore } from "@/store/modalStore";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const transition = {
  ease: "linear",
  duration: 0.3,
  x: { duration: 0.3 },
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const { isModalOpen, closeModal } = useModalStore();
  const [modalContainer, setModalContainer] = useState<Element | null>(null);

  useEffect(() => {
    const modalContainer = document.querySelector("#modal-area");
    if (modalContainer) setModalContainer(modalContainer);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
        closeModal()
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, closeModal, isModalOpen]);

  if (!modalContainer) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 right-0 backdrop-blur-sm backdrop-brightness-75 h-screen w-screen z-[999]"
        >
          <motion.div
            transition={transition}
            initial={{ opacity: 0, translateX: "-100%" }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: "-100%" }}
            className="fixed top-0 left-0 h-screen px-[25px] py-[10px]"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalContainer
  );
};

export default Modal;