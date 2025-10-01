import styles from "./confirm-order.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { ObjectToOpenSectionBurgerConstructorType } from "../../utils/types";

function ConfirmOrder({ ...props }) {
  const [isOpeningModal, setIsOpeningModal] = useState(false);

  const openModal = () => {
    setIsOpeningModal(true);
  };
  const closeModal = () => {
    setIsOpeningModal(false);
  };

  return (
    <>
      {isOpeningModal && (
        <Modal type={"OrderDetails"} functionToClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}

      <div className={`mt-10 ${styles.confirmOrder} ${props.className}`}>
        {!props.onlyButton && (
          <div className={`mr-10 ${styles.price}`}>
            <span className={`mr-2 text text_type_digits-medium`}>
              {props.ingredients.reduce((sum, ingredient) => {
                return (sum += ingredient.price);
              }, 0)}
            </span>
            <CurrencyIcon />
          </div>
        )}
        <Button
          htmlType="button"
          type="primary"
          size={props.size}
          onClick={
            props.objectToOpenSectionBurgerConstructor.currentSection ===
            "BurgerConstructor"
              ? openModal
              : props.objectToOpenSectionBurgerConstructor.func
          }
        >
          {props.textButton}
        </Button>
      </div>
    </>
  );
}

export default ConfirmOrder;

ConfirmOrder.propTypes = {
  onlyButton: PropTypes.bool,
  size: PropTypes.string.isRequired,
  textButton: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  objectToOpenSectionBurgerConstructor:
    ObjectToOpenSectionBurgerConstructorType.isRequired,
};
