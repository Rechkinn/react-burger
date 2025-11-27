import BurgerIngredientsCard from "../burger-ingredients-card/burger-ingredients-card";
import styles from "./burger-ingredients-item.module.css";
import { EIngredientType } from "../../utils/consts";
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
    function translateTypeToRussianLanguage(
      type: TIngredientType
    ): string | null {
      if (type === EIngredientType.BUN) return "Булки";
      else if (type === EIngredientType.SAUCE) return "Соусы";
      else if (type === EIngredientType.MAIN) return "Котлеты";
      return null;
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
                typeDrag={
                  ingredient.type === EIngredientType.BUN
                    ? EIngredientType.BUN
                    : "ingredient"
                }
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
