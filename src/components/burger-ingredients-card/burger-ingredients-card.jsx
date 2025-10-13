import { useEffect, useState } from "react";
import styles from "./burger-ingredients-card.module.css";
import {
  Counter,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { BUN } from "../../utils/consts";

function BurgerIngredientsCard({
  ingredient,
  typeDrag,
  openModalWithIngredientDetails,
}) {
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
  const [currentDevice, setCurrentDevice] = useState(
    window.innerWidth > 768 ? "notMobile" : "mobile"
  );
  useEffect(() => {
    window.addEventListener("resize", updateImageCard);
    return () => window.removeEventListener("resize", updateImageCard);
  }, []);

  function getIngredientCount(ingredientId, ingredientType) {
    let count = 0;
    if (ingredientType !== BUN) {
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
  function updateImageCard() {
    window.innerWidth > 768
      ? setCurrentDevice("notMobile")
      : setCurrentDevice("mobile");
  }

  return (
    <article
      style={{ opacity: isDrag ? 0.3 : 1 }}
      className={`mb-8 ${styles.card}`}
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
        <CurrencyIcon />
      </p>
      <h3 className="mb-5 text text_type_main-small">{ingredient.name}</h3>
      <Button htmlType="button" type="secondary" size="small">
        Добавить
      </Button>
      <Counter count={getIngredientCount(ingredient._id, ingredient.type)} />
    </article>
  );
}

export default BurgerIngredientsCard;

BurgerIngredientsCard.propTypes = {
  ingredient: IngredientType.isRequired,
  typeDrag: PropTypes.string.isRequired,
  openModalWithIngredientDetails: PropTypes.func.isRequired,
};
