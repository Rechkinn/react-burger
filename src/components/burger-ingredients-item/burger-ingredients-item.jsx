import BurgerIngredientsCard from "../burger-ingredients-card/burger-ingredients-card";
import styles from "./burger-ingredients-item.module.css";
import { BUN, MAIN, SAUCE } from "../../utils/consts";
import PropTypes from "prop-types";

function BurgerIngredientsItem({ ...props }) {
  function translateTypeToRussianLanguage(type) {
    if (type === BUN) return "Булки";
    else if (type === SAUCE) return "Соусы";
    else if (type === MAIN) return "Котлеты";
  }

  return (
    <section className={`mt-10 ${styles.item}`}>
      <h2 className="pl-5 pr-5 text text_type_main-medium">
        {translateTypeToRussianLanguage(props.type)}
      </h2>
      <div className={`pt-6 ${styles.cards}`}>
        {props.ingridients.map((ingredient) => {
          return (
            <BurgerIngredientsCard
              key={ingredient._id}
              ingredient={ingredient}
            />
          );
        })}
      </div>
    </section>
  );
}

export default BurgerIngredientsItem;

BurgerIngredientsItem.propTypes = {
  ingridients: PropTypes.arrayOf(
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
  type: PropTypes.string.isRequired,
};
