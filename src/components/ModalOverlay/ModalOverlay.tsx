import React, { MouseEvent } from "react";
import { modalOverlayProps } from "../../Utils/Types";
import styles from "./ModalOverlay.module.css";

export const ModalOverlay = (props: modalOverlayProps) => {
  const { title, children, onClose } = props;

  function clickHandler(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    if (target.id === "ModalOverlay") {
      onClose(e);
    }
  }

  return (
    <div id="ModalOverlay" className={styles.overlay} onClick={clickHandler}>
      {children}
    </div>
  );
};
