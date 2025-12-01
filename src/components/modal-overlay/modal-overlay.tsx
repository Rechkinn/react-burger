import styles from "./modal-overlay.module.css";
import React, { FC, PropsWithChildren } from "react";

type TModalOverlayProps = {
  functionToClose: () => void;
} & PropsWithChildren;

const ModalOverlay: FC<TModalOverlayProps> = React.memo(
  ({ functionToClose, children }) => {
    return (
      <div className={styles.modalOverlay} onClick={functionToClose}>
        {children}
      </div>
    );
  }
);

export default ModalOverlay;
