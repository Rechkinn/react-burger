import { FC } from "react";
import { v4 as uuid } from "uuid";
import styles from "./order-composition-ingredient.module.css";
import { TIngredient } from "../../utils/types";
import { OrderIngredientImage } from "../order-ingredient-image/order-ingredient-image";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type TOrderCompositionIngredientProps = {
  ingredient: {
    count: number;
    details: TIngredient;
  };
};

export const OrderCompositionIngredient: FC<
  TOrderCompositionIngredientProps
> = ({ ingredient }) => {
  return (
    <div className={styles.container}>
      <div className={styles.rightPart}>
        <OrderIngredientImage
          key={uuid()}
          image={ingredient.details.image_mobile}
        />
        <p className={`ml-4 text text_type_main-small ${styles.name}`}>
          {ingredient.details.name}
        </p>
      </div>
      <p className={`text text_type_digits-default ${styles.price}`}>
        <span className="mr-2">
          {ingredient.count} x {ingredient.details.price}
        </span>
        <CurrencyIcon type="primary" />
      </p>
    </div>
  );
};
