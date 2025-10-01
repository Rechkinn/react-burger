import {
  CurrencyIcon,
  LockIcon,
  DeleteIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-element-custom.module.css";
import PropTypes from "prop-types";

function ConstructorElementCustom({ ...props }) {
  return (
    <div className={styles.constructorElement}>
      <img src={props.thumbnail} alt={props.text} />
      <h3 className="text text_type_main-small">{props.text}</h3>
      <div className={styles.price}>
        <span className="mr-2 text text_type_digits-default">
          {props.price}
        </span>
        <CurrencyIcon />
      </div>

      {props.isLocked ? <LockIcon /> : <DeleteIcon />}
    </div>
  );
}

export default ConstructorElementCustom;

ConstructorElementCustom.propTypes = {
  isLocked: PropTypes.bool,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};
