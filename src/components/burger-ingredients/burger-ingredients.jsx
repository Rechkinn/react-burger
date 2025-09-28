import styles from "./burger-ingredients.module.css";
import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import ConfirmOrder from "../confirm-order/confirm-order";
import { BUN, MAIN, SAUCE } from "../../utils/consts";
import PropTypes from "prop-types";

function BurgerIngredients({ ...props }) {
  const [current, setCurrent] = useState("Булки");

  function getIngredientsFromType(type) {
    return props.arrayOfIngredients.filter(
      (ingredient) => ingredient.type === type
    );
  }

  return (
    <>
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
          ingridients={getIngredientsFromType(BUN)}
          type={BUN}
        />
        <BurgerIngredientsItem
          ingridients={getIngredientsFromType(SAUCE)}
          type={SAUCE}
        />
        <BurgerIngredientsItem
          ingridients={getIngredientsFromType(MAIN)}
          type={MAIN}
        />
      </div>

      <ConfirmOrder
        onlyButton={true}
        size={"small"}
        textButton={"Смотреть заказ"}
        className={styles.confirmOrder}
        openBurgerConstructor={props.openBurgerConstructor}
      />
    </>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  arrayOfIngredients: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  openBurgerConstructor: PropTypes.func.isRequired,
};
