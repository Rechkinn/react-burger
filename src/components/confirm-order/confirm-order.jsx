import styles from "./confirm-order.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useModal } from "../../hooks/useModal";
import { useSelector } from "react-redux";

function ConfirmOrder({ section, ...props }) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { bun, burgerConstructor } = useSelector(
    (store) => store.burgerConstructor
  );

  function calculatePrice() {
    const priceWithoutBuns = burgerConstructor.reduce((sum, ingredient) => {
      return (sum += ingredient.ingredient.price);
    }, 0);

    return bun?.ingredient
      ? bun.ingredient.price * 2 + priceWithoutBuns
      : priceWithoutBuns;
  }

  return (
    <>
      {isModalOpen && (
        <Modal
          type={"OrderDetails"}
          functionToClose={closeModal}
          indents={"mt-5 mb-4"}
        >
          <OrderDetails />
        </Modal>
      )}

      <div className={`mt-10 ${styles.confirmOrder} ${props.className}`}>
        {!props.onlyButton && (
          <div className={`mr-10 ${styles.price}`}>
            <span className={`mr-2 text text_type_digits-medium`}>
              {calculatePrice()}
            </span>
            <CurrencyIcon />
          </div>
        )}
        <Button
          disabled={burgerConstructor.length > 0 && bun ? false : true}
          htmlType="button"
          type="primary"
          size={props.size}
          onClick={section === "BurgerConstructor" ? openModal : null}
        >
          {props.textButton}
        </Button>
      </div>
    </>
  );
}

export default ConfirmOrder;

ConfirmOrder.propTypes = {
  className: PropTypes.string.isRequired,
  onlyButton: PropTypes.bool,
  size: PropTypes.string.isRequired,
  textButton: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
};
