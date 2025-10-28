import BurgerIngredientsCard from "../burger-ingredients-card/burger-ingredients-card";
import styles from "./burger-ingredients-item.module.css";
import { BUN, MAIN, SAUCE } from "../../utils/consts";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { forwardRef } from "react";

const BurgerIngredientsItem = forwardRef(({ type }, ref) => {
  const { burgerIngredients } = useSelector((store) => store.burgerIngredients);

  function getIngredientsFromType(typeItem) {
    return burgerIngredients.filter(
      (ingredient) => ingredient.type === typeItem
    );
  }
  function translateTypeToRussianLanguage(type) {
    if (type === BUN) return "Булки";
    else if (type === SAUCE) return "Соусы";
    else if (type === MAIN) return "Котлеты";
  }

  return (
    <section ref={ref} className={`mt-10 ${styles.item}`}>
      <h2 className="pl-5 pr-5 text text_type_main-medium">
        {translateTypeToRussianLanguage(type)}
      </h2>
      <div className={`pt-6 ${styles.cards}`}>
        {getIngredientsFromType(type).map((ingredient) => {
          return (
            <BurgerIngredientsCard
              key={ingredient._id}
              typeDrag={ingredient.type === BUN ? BUN : "ingredient"}
              ingredient={ingredient}
            />
          );
        })}
      </div>
    </section>
  );
});
export default BurgerIngredientsItem;

BurgerIngredientsItem.propTypes = {
  type: PropTypes.string.isRequired,
};
