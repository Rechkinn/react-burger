import BurgerIngredientsCard from "../burger-ingredients-card/burger-ingredients-card";
import styles from "./burger-ingredients-item.module.css";
import { BUN, MAIN, SAUCE } from "../../utils/consts";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FC, forwardRef, RefAttributes } from "react";
import { TIngredient, TIngredientType } from "../../utils/types";

type TBurgerIngredientsItemProps = {
  type: TIngredientType;
} & RefAttributes<HTMLElement>;

const BurgerIngredientsItem: FC<TBurgerIngredientsItemProps> = forwardRef(
  ({ type }, ref) => {
    const { burgerIngredients } = useSelector(
      (store: any) => store.burgerIngredients
    );

    function getIngredientsFromType(typeItem: TIngredientType): TIngredient[] {
      return burgerIngredients.filter(
        (ingredient: TIngredient) => ingredient.type === typeItem
      );
    }
    function translateTypeToRussianLanguage(type: TIngredientType) {
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
  }
);
export default BurgerIngredientsItem;
