import ConstructorElementCustom from "../constructor-element-custom/constructor-element-custom";
import styles from "./burger-constructor-ingredient.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/types";
import { BUN } from "../../utils/consts";

function BurgerConstructorIngredient({
  ingredient,
  indents,
  isDesctop,
  ...props
}) {
  function isBun() {
    return ingredient.type === BUN;
  }

  return (
    <article className={`${indents} ${styles.ingredient}`}>
      {!isBun() && <DragIcon />}
      {isDesctop ? (
        <ConstructorElement
          type={props?.typeBun}
          isLocked={isBun()}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
        />
      ) : (
        <ConstructorElementCustom
          isLocked={isBun()}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
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
