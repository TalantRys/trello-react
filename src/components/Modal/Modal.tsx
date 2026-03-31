import { useEffect, type PropsWithChildren } from "react";
import styles from "./modal.module.scss";
import classNames from "classnames";
import { FocusTrap } from "focus-trap-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({
  children,
  onClose,
  isOpen,
}: PropsWithChildren<ModalProps>) {
  // ESC key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: { key: string }) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Add global event listener
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    isOpen && (
      <FocusTrap>
        <div className={classNames(styles.modal, { [styles.active]: isOpen })}>
          <div
            className={classNames(styles["modal-overlay"], {
              [styles.active]: isOpen,
            })}
            onClick={onClose}
          ></div>
          <div className={styles.modal__container}>
            <button className={styles.modal__close} onClick={onClose}>
              <img
                src="/close.svg"
                alt="close"
                width="20"
                height="20"
                loading="lazy"
              />
            </button>
            <div className={styles.modal__content}>{children}</div>
          </div>
        </div>
      </FocusTrap>
    )
  );
}
