import { FC, PropsWithChildren } from "react";
import styles from "./burger-constructor-ingredient-alternate.module.css";
import PropTypes from "prop-types";

type TPlace = "top" | "bottom";

type TBurgerConstructorIngredientAlternateProps = {
  place: TPlace;
} & PropsWithChildren;

const BurgerConstructorIngredientAlternate: FC<
  TBurgerConstructorIngredientAlternateProps
> = ({ place, children }) => {
  return (
    <div className={place === "top" ? styles.top : styles.bottom}>
      <span className="text text_type_main-default">{children}</span>
    </div>
  );
};

export default BurgerConstructorIngredientAlternate;
