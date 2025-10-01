import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

function ModalOverlay({ functionToClose, children }) {
  return (
    <div className={styles.modalOverlay} onClick={functionToClose}>
      {children}
    </div>
  );
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  functionToClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
