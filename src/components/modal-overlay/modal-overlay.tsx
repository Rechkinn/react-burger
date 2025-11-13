import PropTypes from "prop-types";
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

// ModalOverlay.propTypes = {
//   functionToClose: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
// };
