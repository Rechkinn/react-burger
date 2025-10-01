import ConstructorElementCustom from "../constructor-element-custom/constructor-element-custom";
import styles from "./burger-constructor-ingredient.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/types";
import { BUN } from "../../utils/consts";
import { useState } from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerConstructorIngredient({
  ingredient,
  indents,
  isDesctop,
  ...props
}) {
  const [isOpeningModal, setIsOpeningModal] = useState(false);

  const openModal = () => {
    setIsOpeningModal(true);
  };
  const closeModal = () => {
    setIsOpeningModal(false);
  };

  function isBun() {
    return ingredient.type === BUN;
  }

  return (
    <>
      {isOpeningModal && (
        <Modal type={"IngredientDetails"} functionToClose={closeModal}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}

      <article
        className={`${indents} ${styles.ingredient}`}
        onClick={openModal}
      >
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
    </>
  );
}

export default BurgerConstructorIngredient;

BurgerConstructorIngredient.propTypes = {
  isDesctop: PropTypes.bool.isRequired,
  ingredient: IngredientType.isRequired,
  typeBun: PropTypes.string,
  indents: PropTypes.string.isRequired,
};
