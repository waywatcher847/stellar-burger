import React, { MouseEvent } from "react";
import { ModalOverlayProps } from "../../utils/propTypes";
import modalStyles from "./ModalOverlay.module.css";

export const ModalOverlay = (props: ModalOverlayProps) => {
  const { title, children, onClose } = props;

  function clickHandler(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    if (target.id === "ModalOverlay") {
      onClose(e);
    }
  }

  return (
    <div
      id="ModalOverlay"
      className={modalStyles.overlay}
      onClick={clickHandler}
    >
      {children}
    </div>
  );
};
