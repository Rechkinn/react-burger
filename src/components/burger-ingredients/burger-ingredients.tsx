import styles from "./burger-ingredients.module.css";
import React, { FC, useEffect, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import ConfirmOrder from "../confirm-order/confirm-order";
import { EIngredientType } from "../../utils/consts";
import { TIngredientType } from "../../utils/types";

const BurgerIngredients: FC = React.memo(() => {
  const [current, setCurrent] = useState<TIngredientType>(EIngredientType.BUN);
  const burgerIngredientsContainer = useRef<HTMLDivElement>(null);
  const burgerIngredientsItemBun = useRef<HTMLElement>(null);
  const burgerIngredientsItemSauce = useRef<HTMLElement>(null);
  const burgerIngredientsItemMain = useRef<HTMLElement>(null);

  useEffect(() => {
    if (burgerIngredientsContainer.current === null) return;
    const container: HTMLDivElement = burgerIngredientsContainer.current;

    function scrollBurgerIngredientsContainer() {
      if (
        burgerIngredientsItemBun.current === null ||
        burgerIngredientsItemSauce.current === null ||
        burgerIngredientsItemMain.current === null
      ) {
        return;
      }

      const bordersContainer: DOMRect = container.getBoundingClientRect();
      const bordersItemBun: DOMRect =
        burgerIngredientsItemBun.current.getBoundingClientRect();
      const bordersItemSauce: DOMRect =
        burgerIngredientsItemSauce.current.getBoundingClientRect();
      const bordersItemMain: DOMRect =
        burgerIngredientsItemMain.current.getBoundingClientRect();

      const positionBun: number = Math.abs(
        bordersContainer.top - bordersItemBun.top
      );
      const positionSauce: number = Math.abs(
        bordersContainer.top - bordersItemSauce.top
      );
      const positionMain: number = Math.abs(
        bordersContainer.top - bordersItemMain.top
      );

      if (positionBun < positionSauce && positionBun < positionMain) {
        setCurrent(EIngredientType.BUN);
      } else if (positionSauce < positionBun && positionSauce < positionMain) {
        setCurrent(EIngredientType.SAUCE);
      } else {
        setCurrent(EIngredientType.MAIN);
      }
    }

    container.addEventListener("scroll", scrollBurgerIngredientsContainer);
    return () => {
      container.removeEventListener("scroll", scrollBurgerIngredientsContainer);
    };
  }, []);

  function handlerTabClick(value: string): void {
    console.log();
  }

  return (
    <>
      <div>
        <h1 className="mb-5 pl-5 pr-5 text text_type_main-large">
          Соберите бургер
        </h1>
        <div className={`${styles.ingredientsTabs}`}>
          <Tab
            value="Булки"
            active={current === EIngredientType.BUN}
            onClick={handlerTabClick}
          >
            Булки
          </Tab>
          <Tab
            value="Соусы"
            active={current === EIngredientType.SAUCE}
            onClick={handlerTabClick}
          >
            Соусы
          </Tab>
          <Tab
            value="Начинки"
            active={current === EIngredientType.MAIN}
            onClick={handlerTabClick}
          >
            Начинки
          </Tab>
        </div>
      </div>
      <div ref={burgerIngredientsContainer} className={styles.ingredientsItems}>
        <BurgerIngredientsItem
          ref={burgerIngredientsItemBun}
          type={EIngredientType.BUN}
        />
        <BurgerIngredientsItem
          ref={burgerIngredientsItemSauce}
          type={EIngredientType.SAUCE}
        />
        <BurgerIngredientsItem
          ref={burgerIngredientsItemMain}
          type={EIngredientType.MAIN}
        />
      </div>

      <ConfirmOrder
        onlyButton={true}
        size={"small"}
        textButton={"Смотреть заказ"}
        className={styles.confirmOrder}
        section={"BurgerIngredients"}
      />
    </>
  );
});

export default BurgerIngredients;
