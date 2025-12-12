import styles from "./order-ingredient-image.module.css";
import React, { FC } from "react";

type TOrderIngredientImageProps = {
  image: string;
  isLast?: boolean;
  remainder?: number;
};

export const OrderIngredientImage: FC<TOrderIngredientImageProps> = React.memo(
  ({ image, isLast = false, remainder }) => {
    return (
      <div className={styles.ingredientBackground}>
        <img src={image} alt="" className={styles.ingredientImage} />
        {isLast && remainder && (
          <div className={`text text_type_main-small ${styles.remainder}`}>
            +{remainder}
          </div>
        )}
      </div>
    );
  }
);
