import {
  CurrencyIcon,
  LockIcon,
  DeleteIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-element-custom.module.css";
import React, { FC } from "react";

type TConstructorElementCustomProps = {
  thumbnail: string;
  text: string;
  price: number;
  isLocked: boolean;
};

const ConstructorElementCustom: FC<TConstructorElementCustomProps> = React.memo(
  ({ thumbnail, text, price, isLocked }) => {
    return (
      <div className={styles.constructorElement}>
        <img src={thumbnail} alt={text} />
        <h3 className="text text_type_main-small">{text}</h3>
        <div className={styles.price}>
          <span className="mr-2 text text_type_digits-default">{price}</span>
          <CurrencyIcon type="primary" />
        </div>

        {isLocked ? <LockIcon type="primary" /> : <DeleteIcon type="primary" />}
      </div>
    );
  }
);

export default ConstructorElementCustom;
