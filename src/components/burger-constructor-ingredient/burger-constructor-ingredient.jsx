import ConstructorElementCustom from "../constructor-element-custom/constructor-element-custom";
import styles from "./burger-constructor-ingredient.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function BurgerConstructorIngredient({ ...props }) {
  function isBun() {
    return props.ingredient.type === "bun";
  }

  return (
    <article className={`${props.indents} ${styles.ingredient}`}>
      {!isBun() && <DragIcon />}
      {props.isDesctop ? (
        <ConstructorElement
          type={props?.typeBun}
          isLocked={isBun()}
          text={props.ingredient.name}
          price={props.ingredient.price}
          thumbnail={props.ingredient.image_mobile}
        />
      ) : (
        <ConstructorElementCustom
          isLocked={isBun()}
          text={props.ingredient.name}
          price={props.ingredient.price}
          thumbnail={props.ingredient.image_mobile}
        />
      )}
    </article>
  );
}

export default BurgerConstructorIngredient;

BurgerConstructorIngredient.propTypes = {
  isDesctop: PropTypes.bool.isRequired,
  ingredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  }).isRequired,
  typeBun: PropTypes.string,
  indents: PropTypes.string.isRequired,
};
