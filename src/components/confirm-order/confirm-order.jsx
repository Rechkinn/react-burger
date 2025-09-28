import styles from "./confirm-order.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function ConfirmOrder({ ...props }) {
  return (
    <div className={`mt-10 ${styles.confirmOrder} ${props.className}`}>
      {!props.onlyButton && (
        <div className={`mr-10 ${styles.price}`}>
          <span className={`mr-2 text text_type_digits-medium`}>
            {props.ingredients
              ? props.ingredients.reduce((sum, ingredient) => {
                  return (sum += ingredient.price);
                }, 0)
              : "610"}
          </span>
          <CurrencyIcon />
        </div>
      )}
      <Button
        htmlType="button"
        type="primary"
        size={props.size}
        onClick={props.openBurgerConstructor}
      >
        {props?.textButton ? props?.textButton : "Кнопка"}
      </Button>
    </div>
  );
}

export default ConfirmOrder;

ConfirmOrder.propTypes = {
  onlyButton: PropTypes.bool,
  size: PropTypes.string.isRequired,
  textButton: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  openBurgerConstructor: PropTypes.func.isRequired,
};
