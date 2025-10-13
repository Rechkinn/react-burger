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
  // console.log(ingredient._id);

  const { _id } = ingredient;

  const [{ isDrag }, dragRef] = useDrag({
    type: typeDrag,

    item: { ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const { burgerConstructor } = useSelector((store) => store.burgerConstructor);

  const [currentDevice, setCurrentDevice] = useState(
    window.innerWidth > 768 ? "notMobile" : "mobile"
  );

  function getIngredientCount(ingredientId) {
    // for (let i = 0; i < burgerConstructor.length; i++) {
    //   if (burgerConstructor[i]._id === ingredientId) {
    //     return burgerConstructor[i].count;
    //   }
    // }
    return 0;
  }

  function updateImageCard() {
    window.innerWidth > 768
      ? setCurrentDevice("notMobile")
      : setCurrentDevice("mobile");
  }

  useEffect(() => {
    window.addEventListener("resize", updateImageCard);
    return () => window.removeEventListener("resize", updateImageCard);
  }, []);

  return (
    <>
      <article
        style={{ opacity: isDrag ? 0.3 : 1 }}
        ref={dragRef}
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
          // ref={dragRef}
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
        <Counter count={getIngredientCount()} />
      </article>
    </>
  );
}

export default BurgerIngredientsCard;

BurgerIngredientsCard.propTypes = {
  ingredient: IngredientType.isRequired,
  openModalWithIngredientDetails: PropTypes.func.isRequired,
};
