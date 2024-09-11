"use client";

import { AnimatePresence, motion } from "framer-motion";

interface SideModalType {
  isOpen?: boolean;
  toggleModal?: () => void;
  children?: React.ReactNode;
}

const transition = {
  ease: "linear",
  duration: 0.3,
  x: { duration: 0.3 },
};

const SideModal: React.FC<SideModalType> = ({
  children,
  isOpen,
  toggleModal,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="z-10 fixed backdrop-blur-md w-screen h-screen"
        >
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={transition}
            className="h-screen w-1/5 bg-primary-blue rounded-lg relative"
          >
            <div
              onClick={toggleModal}
              className="absolute text-black cursor-pointer p-1 text-sm right-1 top-1 bg-secondary-gray rounded-full"
              id="close-modal-btn"
            >
              X
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default SideModal;
