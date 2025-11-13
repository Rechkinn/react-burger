import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { SyntheticEvent, useEffect } from "react";
import PropTypes from "prop-types";
import { FC, PropsWithChildren } from "react";

type TModalProps = {
  functionToClose: () => void;
  title?: string;
  indents: string;
} & PropsWithChildren;

const elementForRenderModal = document.getElementById("react-modals");

const Modal: FC<TModalProps> = ({
  functionToClose,
  children,
  title,
  indents = "",
}) => {
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        functionToClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  if (!elementForRenderModal) return null;

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
            <CloseIcon type="primary" />
          </button>
        </header>
        {children}
      </div>
    </ModalOverlay>,
    elementForRenderModal
  );
};

export default Modal;

// Modal.propTypes = {
//   functionToClose: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
//   title: PropTypes.string,
//   indents: PropTypes.string,
// };
