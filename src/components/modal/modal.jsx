import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import PropTypes from "prop-types";

const elementForRenderModal = document.getElementById("react-modals");

function Modal({ type, functionToClose, children, title, indents = "" }) {
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        functionToClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return createPortal(
    <ModalOverlay functionToClose={functionToClose}>
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header className={`${indents} ${styles.title}`}>
          {title && (
            <h1 className={`text text_type_main-large ${styles.h1}`}>
              {title}
            </h1>
          )}

          <button
            type="button"
            className={styles.button}
            onClick={() => functionToClose()}
          >
            <CloseIcon />
          </button>
        </header>
        {children}
      </div>
    </ModalOverlay>,
    elementForRenderModal
  );
}

export default Modal;

Modal.propTypes = {
  functionToClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  indents: PropTypes.string,
};
