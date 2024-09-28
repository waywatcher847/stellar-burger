import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { modalOverlayProps } from "../../Utils/Types";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const Modal = (props: modalOverlayProps) => {
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
  });

  if (!open) return null;

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={styles.container}>
        <Button
          htmlType="button"
          size="small"
          onClick={onClose}
          onMouseEnter={() => setExitIsHovered(true)}
          onMouseLeave={() => setExitIsHovered(false)}
          extraClass={styles.exitButton}
        >
          <CloseIcon type={exitIsHovered ? "secondary" : "primary"} />
        </Button>
        <div className={styles.header}>
          {<text className="text text_type_main-large">{title}</text>}
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById("modal") as HTMLElement,
  );
};
