import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import { FC, PropsWithChildren } from "react";

type TModalProps = {
  functionToClose: () => void;
  title?: string;
  indents?: string;
} & PropsWithChildren;

const elementForRenderModal: HTMLElement | null =
  document.getElementById("react-modals");

const Modal: FC<TModalProps> = React.memo(
  ({ functionToClose, children, title, indents = "" }) => {
    useEffect(() => {
      function handleEscape(e: KeyboardEvent): void {
        if (e.key === "Escape") {
          functionToClose();
        }
      }

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [functionToClose]);

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
              className={`closeModalIcon ${styles.button}`}
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
  }
);

export default Modal;
