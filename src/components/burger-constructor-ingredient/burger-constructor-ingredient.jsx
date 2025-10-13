import ConstructorElementCustom from "../constructor-element-custom/constructor-element-custom";
import styles from "./burger-constructor-ingredient.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/types";
import { BUN } from "../../utils/consts";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  CHANGE_SUBSEQUENCE_BURGER_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
} from "../../services/actions/burger-constructor";

function BurgerConstructorIngredient({
  positionList,
  ingredient,
  indents,
  isDesctop,
  ...props
}) {
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

  function isBun() {
    return ingredient.type === BUN;
  }
  function removeBurgerConstructorIngredient(ingredientId) {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      id: ingredientId,
    });
  }

  return (
    <>
      {ingredient && (
        <div
          ref={ingredient.type !== BUN ? dropTarget : null}
          style={{
            backgroundColor: isHover ? "#4c4cff" : "transparent",
            borderRadius: "500px",
          }}
        >
          <article
            ref={ingredient.type !== BUN ? dragRef : null}
            style={{ opacity: isDrag ? 0.3 : 1 }}
            className={`${indents} ${styles.ingredient}`}
          >
            {!isBun() && <DragIcon />}
            {isDesctop ? (
              <ConstructorElement
                type={props?.typeBun}
                isLocked={isBun()}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                handleClose={() =>
                  removeBurgerConstructorIngredient(ingredient._id)
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
}

export default BurgerConstructorIngredient;

BurgerConstructorIngredient.propTypes = {
  positionList: PropTypes.number.isRequired,
  ingredient: IngredientType.isRequired,
  indents: PropTypes.string.isRequired,
  isDesctop: PropTypes.bool.isRequired,
  typeBun: PropTypes.string,
};
