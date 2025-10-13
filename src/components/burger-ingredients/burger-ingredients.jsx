import styles from "./burger-ingredients.module.css";
import { useEffect, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import ConfirmOrder from "../confirm-order/confirm-order";
import { BUN, MAIN, SAUCE } from "../../utils/consts";
import { useModal } from "../../hooks/useModal";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch } from "react-redux";
import {
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS,
} from "../../services/actions/ingredient-details";

function BurgerIngredients() {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(BUN);
  const { isModalOpen, openModal, closeModal } = useModal();
  const burgerIngredientsContainer = useRef();
  const burgerIngredientsItemBun = useRef();
  const burgerIngredientsItemSauce = useRef();
  const burgerIngredientsItemMain = useRef();
  useEffect(() => {
    const container = burgerIngredientsContainer.current;
    if (!container) return;

    function scrollBurgerIngredientsContainer() {
      const bordersContainer = container.getBoundingClientRect();
      const bordersItemBun =
        burgerIngredientsItemBun.current.getBoundingClientRect();
      const bordersItemSauce =
        burgerIngredientsItemSauce.current.getBoundingClientRect();
      const bordersItemMain =
        burgerIngredientsItemMain.current.getBoundingClientRect();
      const positionBun = Math.abs(bordersContainer.top - bordersItemBun.top);
      const positionSauce = Math.abs(
        bordersContainer.top - bordersItemSauce.top
      );
      const positionMain = Math.abs(bordersContainer.top - bordersItemMain.top);

      if (positionBun < positionSauce && positionBun < positionMain) {
        setCurrent(BUN);
      } else if (positionSauce < positionBun && positionSauce < positionMain) {
        setCurrent(SAUCE);
      } else {
        setCurrent(MAIN);
      }
    }

    container.addEventListener("scroll", scrollBurgerIngredientsContainer);
    return () => {
      container.removeEventListener("scroll", scrollBurgerIngredientsContainer);
    };
  }, []);

  function openModalWithIngredientDetails(ingredient) {
    dispatch({
      type: ADD_INGREDIENT_DETAILS,
      ingredientDetails: ingredient,
    });
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
          <Tab value="Булки" active={current === BUN}>
            Булки
          </Tab>
          <Tab value="Соусы" active={current === SAUCE}>
            Соусы
          </Tab>
          <Tab value="Начинки" active={current === MAIN}>
            Начинки
          </Tab>
        </div>
      </div>
      <div ref={burgerIngredientsContainer} className={styles.ingredientsItems}>
        <BurgerIngredientsItem
          ref={burgerIngredientsItemBun}
          type={BUN}
          openModalWithIngredientDetails={openModalWithIngredientDetails}
        />
        <BurgerIngredientsItem
          ref={burgerIngredientsItemSauce}
          type={SAUCE}
          openModalWithIngredientDetails={openModalWithIngredientDetails}
        />
        <BurgerIngredientsItem
          ref={burgerIngredientsItemMain}
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
      />
    </>
  );
}

export default BurgerIngredients;
