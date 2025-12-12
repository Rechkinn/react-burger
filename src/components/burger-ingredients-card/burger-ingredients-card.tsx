import React, { FC, useEffect, useState } from "react";
import styles from "./burger-ingredients-card.module.css";
import {
  Counter,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient, TLocation } from "../../utils/types";
import { useDrag } from "react-dnd";
import { EIngredientType } from "../../utils/consts";
import { Link, useLocation } from "react-router";
import { ADD_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";
import { useDispatch, useSelector } from "../../utils/additionalStorageTyping";

type TBurgerIngredientsCardProps = {
  ingredient: TIngredient;
  typeDrag: string;
};

const BurgerIngredientsCard: FC<TBurgerIngredientsCardProps> = React.memo(
  ({ ingredient, typeDrag }) => {
    const dispatch = useDispatch();
    const location: TLocation = useLocation();
    const [{ isDrag }, dragRef] = useDrag({
      type: typeDrag,
      item: { ingredient },
      collect: (monitor) => ({
        isDrag: monitor.isDragging(),
      }),
    });
    const { bun, burgerConstructor } = useSelector(
      (store) => store.burgerConstructor
    );
    const [currentDevice, setCurrentDevice] = useState<string>(
      window.innerWidth > 768 ? "notMobile" : "mobile"
    );
    useEffect(() => {
      window.addEventListener("resize", updateImageCard);
      return () => window.removeEventListener("resize", updateImageCard);
    }, []);

    function getIngredientCount(
      ingredientId: string,
      ingredientType: string
    ): number {
      let count: number = 0;
      if (ingredientType !== EIngredientType.BUN) {
        for (let i = 0; i < burgerConstructor.length; i++) {
          if (burgerConstructor[i].ingredient._id === ingredientId) {
            count++;
          }
        }
      } else {
        if (bun?.ingredient._id === ingredientId) {
          count = 2;
        }
      }
      return count;
    }
    function updateImageCard(): void {
      window.innerWidth > 768
        ? setCurrentDevice("notMobile")
        : setCurrentDevice("mobile");
    }

    function openModalWithIngredientDetails(ingredient: TIngredient): void {
      dispatch({
        type: ADD_INGREDIENT_DETAILS,
        ingredientDetails: ingredient,
      });
    }

    return (
      <Link
        to={`/ingredients/${ingredient._id}`}
        state={{ background: location }}
        className={`${styles.link}`}
      >
        <article
          style={{ opacity: isDrag ? 0.3 : 1 }}
          className={`draggable-item mb-8 ${styles.card}`}
          onClick={() => openModalWithIngredientDetails(ingredient)}
        >
          <img
            src={
              currentDevice === "mobile"
                ? ingredient.image_mobile
                : ingredient.image
            }
            alt={ingredient.name}
            ref={dragRef}
            className={`mb-1 ${styles.image}`}
          />
          <p className={`mb-1 ${styles.price}`}>
            <span className="mr-2 text text_type_digits-default">
              {ingredient.price}
            </span>
            <CurrencyIcon type="primary" />
          </p>
          <h3 className="mb-5 text text_type_main-small">{ingredient.name}</h3>
          <Button htmlType="button" type="secondary" size="small">
            Добавить
          </Button>
          <Counter
            count={getIngredientCount(ingredient._id, ingredient.type)}
          />
        </article>
      </Link>
    );
  }
);

export default BurgerIngredientsCard;
