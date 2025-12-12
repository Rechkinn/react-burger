import React, { FC, PropsWithChildren } from "react";
import styles from "./burger-constructor-ingredient-alternate.module.css";
import { TUpOrDown } from "../../utils/types";

type TBurgerConstructorIngredientAlternateProps = {
  place: TUpOrDown;
} & PropsWithChildren;

const BurgerConstructorIngredientAlternate: FC<TBurgerConstructorIngredientAlternateProps> =
  React.memo(({ place, children }) => {
    return (
      <div
        className={
          place === "top"
            ? `bun-drop ${styles.top}`
            : `bun-drop ${styles.bottom}`
        }
      >
        <span className="text text_type_main-default">{children}</span>
      </div>
    );
  });

export default BurgerConstructorIngredientAlternate;
