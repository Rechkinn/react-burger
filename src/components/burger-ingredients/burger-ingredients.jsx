import styles from "./burger-ingredients.module.css";
import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import ConfirmOrder from "../confirm-order/confirm-order";
import { BUN, MAIN, SAUCE } from "../../utils/consts";
import PropTypes from "prop-types";
import {
  IngredientType,
  ObjectToOpenSectionBurgerConstructorType,
} from "../../utils/types";
import { useModal } from "../../hooks/useModal";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS,
} from "../../services/actions/ingredient-details";

function BurgerIngredients() {
  const [current, setCurrent] = useState("Булки");
  const { isModalOpen, openModal, closeModal } = useModal();
  // const [ingredientDetails, setIngredientDetails] = useState();

  // const { burgerIngredients } = useSelector((store) => store.burgerIngredients);
  const { ingredientDetails } = useSelector((store) => store.ingredientDetails);

  const dispatch = useDispatch();

  // function getIngredientsFromType(type) {
  //   return burgerIngredients.filter((ingredient) => ingredient.type === type);
  // }

  function openModalWithIngredientDetails(ingredient) {
    dispatch({
      type: ADD_INGREDIENT_DETAILS,
      ingredientDetails: ingredient,
    });

    // setIngredientDetails(ingredient);
    openModal();
  }

  function closeModalWithIngredientDetails() {
    dispatch({
      type: REMOVE_INGREDIENT_DETAILS,
    });

    closeModal();
  }

  return (
    <>
      {isModalOpen && (
        <Modal
          functionToClose={closeModalWithIngredientDetails}
          title={"Детали ингредиента"}
        >
          <IngredientDetails />
        </Modal>
      )}
      <div>
        <h1 className="mb-5 pl-5 pr-5 text text_type_main-large">
          Соберите бургер
        </h1>
        <div className={`${styles.ingredientsTabs}`}>
          <Tab
            value="Булки"
            active={current === "Булки"}
            onClick={() => setCurrent("Булки")}
          >
            Булки
          </Tab>
          <Tab
            value="Соусы"
            active={current === "Соусы"}
            onClick={() => setCurrent("Соусы")}
          >
            Соусы
          </Tab>
          <Tab
            value="Начинки"
            active={current === "Начинки"}
            onClick={() => setCurrent("Начинки")}
          >
            Начинки
          </Tab>
        </div>
      </div>
      <div className={styles.ingredientsItems}>
        <BurgerIngredientsItem
          // ingridients={getIngredientsFromType(BUN)}
          type={BUN}
          openModalWithIngredientDetails={openModalWithIngredientDetails}
        />
        <BurgerIngredientsItem
          // ingridients={getIngredientsFromType(SAUCE)}
          type={SAUCE}
          openModalWithIngredientDetails={openModalWithIngredientDetails}
        />
        <BurgerIngredientsItem
          // ingridients={getIngredientsFromType(MAIN)}
          type={MAIN}
          openModalWithIngredientDetails={openModalWithIngredientDetails}
        />
      </div>

      <ConfirmOrder
        onlyButton={true}
        size={"small"}
        textButton={"Смотреть заказ"}
        className={styles.confirmOrder}
        section={"BurgerIngredients"}
        // objectToOpenSectionBurgerConstructor={
        //   objectToOpenSectionBurgerConstructor
        // }
      />
    </>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  arrayOfIngredients: PropTypes.arrayOf(IngredientType).isRequired,
  objectToOpenSectionBurgerConstructor:
    ObjectToOpenSectionBurgerConstructorType.isRequired,
};
