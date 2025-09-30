import ConstructorElementCustom from "../constructor-element-custom/constructor-element-custom";
import styles from "./burger-constructor-ingredient.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/types";
import { BUN } from "../../utils/consts";

function BurgerConstructorIngredient({ ...props }) {
  function isBun() {
    return props.ingredient.type === BUN;
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
  ingredient: IngredientType.isRequired,
  typeBun: PropTypes.string,
  indents: PropTypes.string.isRequired,
};
