import styles from "./burger-ingredients.module.css";
import { FC, useEffect, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import ConfirmOrder from "../confirm-order/confirm-order";
import { BUN, MAIN, SAUCE } from "../../utils/consts";
import { TIngredientType } from "../../utils/types";

const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState<TIngredientType>(BUN);
  const burgerIngredientsContainer = useRef<HTMLDivElement>(null);
  const burgerIngredientsItemBun = useRef<HTMLElement>(null);
  const burgerIngredientsItemSauce = useRef<HTMLElement>(null);
  const burgerIngredientsItemMain = useRef<HTMLElement>(null);

  useEffect(() => {
    if (burgerIngredientsContainer.current === null) return;
    const container = burgerIngredientsContainer.current;

    function scrollBurgerIngredientsContainer() {
      if (
        burgerIngredientsItemBun.current === null ||
        burgerIngredientsItemSauce.current === null ||
        burgerIngredientsItemMain.current === null
      ) {
        return;
      }

      const bordersContainer = container.getBoundingClientRect();
      const bordersItemBun =
        burgerIngredientsItemBun.current.getBoundingClientRect();
      const bordersItemSauce =
        burgerIngredientsItemSauce.current.getBoundingClientRect();
      const bordersItemMain =
        burgerIngredientsItemMain.current.getBoundingClientRect();
      const positionBun = Math.abs(bordersContainer.top - bordersItemBun.top);
      const positionSauce = Math.abs(
        bordersContainer.top - bordersItemSauce.top
      );
      const positionMain = Math.abs(bordersContainer.top - bordersItemMain.top);

      if (positionBun < positionSauce && positionBun < positionMain) {
        setCurrent(BUN);
      } else if (positionSauce < positionBun && positionSauce < positionMain) {
        setCurrent(SAUCE);
      } else {
        setCurrent(MAIN);
      }
    }

    container.addEventListener("scroll", scrollBurgerIngredientsContainer);
    return () => {
      container.removeEventListener("scroll", scrollBurgerIngredientsContainer);
    };
  }, []);

  function handlerTabClick(value: string) {
    console.log(value);
  }

  return (
    <>
      <div>
        <h1 className="mb-5 pl-5 pr-5 text text_type_main-large">
          Соберите бургер
        </h1>
        <div className={`${styles.ingredientsTabs}`}>
          <Tab value="Булки" active={current === BUN} onClick={handlerTabClick}>
            Булки
          </Tab>
          <Tab
            value="Соусы"
            active={current === SAUCE}
            onClick={handlerTabClick}
          >
            Соусы
          </Tab>
          <Tab
            value="Начинки"
            active={current === MAIN}
            onClick={handlerTabClick}
          >
            Начинки
          </Tab>
        </div>
      </div>
      <div ref={burgerIngredientsContainer} className={styles.ingredientsItems}>
        <BurgerIngredientsItem ref={burgerIngredientsItemBun} type={BUN} />
        <BurgerIngredientsItem ref={burgerIngredientsItemSauce} type={SAUCE} />
        <BurgerIngredientsItem ref={burgerIngredientsItemMain} type={MAIN} />
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
};

export default BurgerIngredients;
