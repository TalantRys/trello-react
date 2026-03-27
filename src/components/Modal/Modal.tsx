import { type PropsWithChildren } from "react";
import styles from "./modal.module.scss";
import classNames from "classnames";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({
  children,
  onClose,
  isOpen,
}: PropsWithChildren<ModalProps>) {
  if (!isOpen) return null;

  return (
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
  );
}
