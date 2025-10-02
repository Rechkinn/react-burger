import { useEffect, useState, useCallback } from "react";
import styles from "./burger-ingredients-card.module.css";
import {
  Counter,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerIngredientsCard({ ingredient }) {
  const [currentDevice, setCurrentDevice] = useState(
    window.innerWidth > 768 ? "notMobile" : "mobile"
  );
  const [isOpeningModal, setIsOpeningModal] = useState(false);

  const openModal = () => {
    setIsOpeningModal(true);
  };
  const closeModal = () => {
    setIsOpeningModal(false);
  };

  function updateImageCard() {
    window.innerWidth > 768
      ? setCurrentDevice("notMobile")
      : setCurrentDevice("mobile");
  }

  useEffect(() => {
    window.addEventListener("resize", updateImageCard);
    return () => window.removeEventListener("resize", updateImageCard);
  }, []);

  return (
    <>
      {isOpeningModal && (
        <Modal functionToClose={closeModal} title={"Детали ингредиента"}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
      <article className={`mb-8 ${styles.card}`} onClick={openModal}>
        <img
          src={
            currentDevice === "mobile"
              ? ingredient.image_mobile
              : ingredient.image
          }
          alt={ingredient.name}
          className={`mb-1 ${styles.image}`}
        />
        <p className={`mb-1 ${styles.price}`}>
          <span className="mr-2 text text_type_digits-default">
            {ingredient.price}
          </span>
          <CurrencyIcon />
        </p>
        <h3 className="mb-5 text text_type_main-small">{ingredient.name}</h3>
        <Button htmlType="button" type="secondary" size="small">
          Добавить
        </Button>
        <Counter />
      </article>
    </>
  );
}

export default BurgerIngredientsCard;

BurgerIngredientsCard.propTypes = {
  ingredient: IngredientType.isRequired,
};
