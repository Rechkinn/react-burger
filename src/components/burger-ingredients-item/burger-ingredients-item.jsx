import BurgerIngredientsCard from "../burger-ingredients-card/burger-ingredients-card";
import styles from "./burger-ingredients-item.module.css";
import { BUN, MAIN, SAUCE } from "../../utils/consts";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/types";

function BurgerIngredientsItem({
  ingridients,
  type,
  openModalWithIngredientDetails,
}) {
  function translateTypeToRussianLanguage(type) {
    if (type === BUN) return "Булки";
    else if (type === SAUCE) return "Соусы";
    else if (type === MAIN) return "Котлеты";
  }

  return (
    <section className={`mt-10 ${styles.item}`}>
      <h2 className="pl-5 pr-5 text text_type_main-medium">
        {translateTypeToRussianLanguage(type)}
      </h2>
      <div className={`pt-6 ${styles.cards}`}>
        {ingridients.map((ingredient) => {
          return (
            <BurgerIngredientsCard
              key={ingredient._id}
              ingredient={ingredient}
              openModalWithIngredientDetails={openModalWithIngredientDetails}
            />
          );
        })}
      </div>
    </section>
  );
}

export default BurgerIngredientsItem;

BurgerIngredientsItem.propTypes = {
  ingridients: PropTypes.arrayOf(IngredientType).isRequired,
  type: PropTypes.string.isRequired,
  openModalWithIngredientDetails: PropTypes.func.isRequired,
};
