import styles from "./burger-constructor-ingredient-alternate.module.css";
import PropTypes from "prop-types";

export default function BurgerConstructorIngredientAlternate({
  place,
  children,
}) {
  return (
    <div className={place === "top" ? styles.top : styles.bottom}>
      <span className="text text_type_main-default">{children}</span>
    </div>
  );
}

BurgerConstructorIngredientAlternate.propType = {
  place: PropTypes.string.isRequired,
};
