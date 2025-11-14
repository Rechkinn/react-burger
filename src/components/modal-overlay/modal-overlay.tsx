import styles from "./modal-overlay.module.css";
import { FC, PropsWithChildren } from "react";

type TModalOverlayProps = {
  functionToClose: () => void;
} & PropsWithChildren;

const ModalOverlay: FC<TModalOverlayProps> = ({
  functionToClose,
  children,
}) => {
  return (
    <div className={styles.modalOverlay} onClick={functionToClose}>
      {children}
    </div>
  );
};

export default ModalOverlay;
