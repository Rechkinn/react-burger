import ConstructorElementCustom from "../constructor-element-custom/constructor-element-custom";
import styles from "./burger-constructor-ingredient.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient, TUpOrDown } from "../../utils/types";
import { EIngredientType } from "../../utils/consts";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  CHANGE_SUBSEQUENCE_BURGER_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
} from "../../services/actions/burger-constructor";
import { FC } from "react";

type TBurgerConstructorIngredientProps = {
  positionList?: number;
  ingredient: TIngredient;
  indents: string;
  isDesctop: boolean;
  uniqueId?: string;
  typeBun?: TUpOrDown;
};

const BurgerConstructorIngredient: FC<TBurgerConstructorIngredientProps> = ({
  uniqueId,
  positionList,
  ingredient,
  indents,
  isDesctop,
  typeBun,
}) => {
  const dispatch = useDispatch();
  const [{ isDrag }, dragRef] = useDrag({
    type: "constructorElement",

    item: { positionList },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const [{ isHover }, dropTarget] = useDrop({
    accept: "constructorElement",
    drop(positionIngredientFromDrag) {
      dispatch({
        type: CHANGE_SUBSEQUENCE_BURGER_CONSTRUCTOR,
        positionDropTargetElement: positionList,
        positionDragElement: positionIngredientFromDrag,
      });
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  function isBun(): boolean {
    return ingredient.type === EIngredientType.BUN;
  }
  function removeBurgerConstructorIngredient(uuid: string): void {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      uuid: uuid,
    });
  }

  return (
    <>
      {ingredient && (
        <div
          ref={ingredient.type !== EIngredientType.BUN ? dropTarget : null}
          style={{
            backgroundColor: isHover ? "#4c4cff" : "transparent",
            borderRadius: "500px",
          }}
        >
          <article
            ref={ingredient.type !== EIngredientType.BUN ? dragRef : null}
            style={{ opacity: isDrag ? 0.3 : 1 }}
            className={`${indents} ${styles.ingredient}`}
          >
            {!isBun() && <DragIcon type="primary" />}
            {isDesctop ? (
              <ConstructorElement
                type={typeBun}
                isLocked={isBun()}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                handleClose={
                  uniqueId
                    ? () => removeBurgerConstructorIngredient(uniqueId)
                    : undefined
                }
              />
            ) : (
              <ConstructorElementCustom
                isLocked={isBun()}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
              />
            )}
          </article>
        </div>
      )}
    </>
  );
};

export default BurgerConstructorIngredient;
