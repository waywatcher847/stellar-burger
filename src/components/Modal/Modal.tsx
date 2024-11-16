import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "../../utils/Types";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const Modal = (props: ModalProps) => {
  const { open, title, children, onClose } = props;
  const [exitIsHovered, setExitIsHovered] = useState(false);

  useEffect(() => {
    const keyHandler = (e: KeyboardEventInit) => {
      if (e.key === "Escape") onClose(e);
    };
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  }, []);

  if (!open) return <div>{children}</div>;

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="text text_type_main-large">{title}</h2>
          <div
            role="button"
            onMouseEnter={() => setExitIsHovered(true)}
            onMouseLeave={() => setExitIsHovered(false)}
            onClick={(e) => onClose(e)}
            className={styles.exitButton}
          >
            <CloseIcon type={exitIsHovered ? "secondary" : "primary"} />
          </div>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById("modal") as HTMLElement,
  );
};
