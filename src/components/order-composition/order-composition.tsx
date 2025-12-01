import { v4 as uuid } from "uuid";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NotFound from "../../pages/not-found/not-found";
import { useSelector } from "../../utils/additionalStorageTyping";
import { calculatePrice } from "../../utils/calculatePrice";
import styles from "./order-composition.module.css";
import React, { FC, useEffect, useState } from "react";
import { getOrderStatusInRussianLanguage } from "../../utils/getOrderStatusInRussianLanguage";
import { TIngredient } from "../../utils/types";
import { OrderCompositionIngredient } from "../order-composition-ingredient/order-composition-ingredient";

type TObject = {
  count: number;
  details: TIngredient;
};

type TObjectIngredients = {
  [key: string]: TObject;
};

type TArray = [string, TObject];

type TOrderComposition = {
  textAlign: "start" | "center";
};

export const OrderComposition: FC<TOrderComposition> = React.memo(
  ({ textAlign }) => {
    const { orderForViewing } = useSelector((store) => store.orderDetails);
    const { burgerIngredients } = useSelector(
      (store) => store.burgerIngredients
    );

    const [ingredientsObject, setIngredientsObject] = useState<TArray[]>();

    useEffect(() => {
      if (!orderForViewing) return;
      const object: TObjectIngredients = {};

      orderForViewing.ingredients.forEach((ingredientId) => {
        const ingredient: TIngredient | undefined = burgerIngredients.find(
          (ingredient) => ingredient._id === ingredientId
        );

        if (!ingredient) return;
        object[ingredientId] = {
          count: (object[ingredientId]?.count || 0) + 1,
          details: { ...ingredient },
        };
      });

      setIngredientsObject(Object.entries(object));
    }, []);

    return orderForViewing ? (
      <article className={styles.article}>
        <header>
          <p
            style={{ textAlign: textAlign }}
            className={`mb-10 text text_type_digits-default ${styles.number}`}
          >
            #{orderForViewing.number}
          </p>
          <h2 className="mb-3 text text_type_main-medium">
            {orderForViewing.name}
          </h2>
          <p
            className={`mb-15 text text_type_main-small ${styles.status} ${
              styles[orderForViewing.status]
                ? styles[orderForViewing.status]
                : ""
            }`.trim()}
          >
            {getOrderStatusInRussianLanguage(orderForViewing.status)}
          </p>
        </header>
        <div className="mb-10">
          <p className="mb-6 text text_type_main-medium">Состав:</p>
          <div className={styles.ingredients}>
            {ingredientsObject &&
              ingredientsObject.map((ingredient) => {
                return (
                  <OrderCompositionIngredient
                    key={uuid()}
                    ingredient={ingredient[1]}
                  />
                );
              })}
          </div>
        </div>
        <footer className={styles.footer}>
          <FormattedDate
            date={new Date(orderForViewing.createdAt)}
            className="text text_type_main-small text_color_inactive"
          />
          <p className={styles.price}>
            <span className="mr-2 text text_type_digits-default">
              {calculatePrice(orderForViewing.ingredients, burgerIngredients)}
            </span>
            <CurrencyIcon type="primary" />
          </p>
        </footer>
      </article>
    ) : (
      <NotFound />
    );
  }
);
