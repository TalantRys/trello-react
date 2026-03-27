import { type PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";

type ModalProvider = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalProvider({
  children,
  isOpen = false,
  onClose,
}: PropsWithChildren<ModalProvider>) {
  return createPortal(
    <Modal onClose={onClose} isOpen={isOpen}>
      {children}
    </Modal>,
    document.body,
  );
}
