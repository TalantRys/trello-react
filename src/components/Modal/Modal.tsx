import { useEffect, useRef, type PropsWithChildren } from "react";
import styles from "./modal.module.scss";
import classNames from "classnames";
import { FocusTrap } from "focus-trap-react";
import { Transition } from "react-transition-group";
import { createPortal } from "react-dom";
import Menu, { type MenuProps } from "../Menu/Menu";

type ModalProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  menuItems?: MenuProps["items"];
};

export default function Modal({
  children,
  onClose,
  isOpen,
  title,
  menuItems,
}: PropsWithChildren<ModalProps>) {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const lockScroll = (lock: boolean) =>
    document.body.classList.toggle("scroll-lock", lock);

  // ESC key handling
  useEffect(() => {
    if (!isOpen) return;

    lockScroll(true);

    const handleEscape = (event: { key: string }) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Add global event listener
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return createPortal(
    <Transition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={300}
      unmountOnExit
      onEnter={() => lockScroll(true)}
      onExit={() => lockScroll(false)}
    >
      {(state) => (
        <FocusTrap
          active={isOpen}
          focusTrapOptions={{
            fallbackFocus: () => (nodeRef.current as HTMLElement) || undefined,
          }}
        >
          <div
            ref={nodeRef}
            tabIndex={-1}
            className={classNames(styles.modal, styles[state])}
          >
            <div
              className={classNames(styles["modal-overlay"], styles[state])}
              onClick={onClose}
            ></div>
            <div className={styles.modal__container}>
              <div className={styles.modal__header}>
                <h2 className={styles.modal__title}>{title}</h2>
                <div className={styles.modal__buttons}>
                  <Menu items={menuItems} />

                  <button className={styles.modal__close} onClick={onClose}>
                    <img
                      src="/close.svg"
                      alt="close"
                      width="20"
                      height="20"
                      loading="lazy"
                    />
                  </button>
                </div>
              </div>

              <div className={styles.modal__content}>{children}</div>
            </div>
          </div>
        </FocusTrap>
      )}
    </Transition>,
    document.body,
  );
}
