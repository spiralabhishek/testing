"use client";
import React, { useCallback, useEffect, useState } from "react";
import SideModal from "./SideModal";
import { createPortal } from "react-dom";

const SideMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);

  const [modalContainer, setModalContainer] = useState<Element | null>(null);

  // Ensuring the dom element is available before rendering
  useEffect(() => {
    const modalContainer = document.querySelector("#app-modal");
    if (modalContainer) setModalContainer(modalContainer);
  }, [setModalContainer]);

  return (
    <>
      <button onClick={toggleMenu}>פתח</button>
      {modalContainer &&
        createPortal(
          <SideModal isOpen={isOpen} toggleModal={toggleMenu} />,
          modalContainer
        )}
    </>
  );
};

export default SideMenu;
