import React, { FC, useEffect, useState } from "react";
import BurgerConstructorIngredient from "../burger-constructor-ingredient/burger-constructor-ingredient";
import ConfirmOrder from "../confirm-order/confirm-order";
import styles from "./burger-constructor.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { EIngredientType } from "../../utils/consts";
import { useDrop } from "react-dnd";
import {
  addIngridient,
  SET_BUN,
} from "../../services/actions/burger-constructor";
import BurgerConstructorIngredientAlternate from "../burger-constructor-ingredient-alternate/burger-constructor-ingredient-alternate";
import {
  TIngredientType,
  TIngredientWithUniqueId,
  TUpOrDown,
} from "../../utils/types";
import { useDispatch, useSelector } from "../../utils/additionalStorageTyping";

type TBurgerConstructorProps = {
  closeBurgerConstructor: () => void;
};

type TState = {
  widthScreen: number;
  isDesctop: boolean;
  heightBlok: number;
};

type TMaxHeight = { maxHeight: string };

type TIngredientForIndents = {
  place: TUpOrDown | null;
  type: TIngredientType;
};

const BurgerConstructor: FC<TBurgerConstructorProps> = React.memo(
  ({ closeBurgerConstructor }) => {
    const dispatch = useDispatch();
    const [{ isHoverAllIngredients }, dropTargetAllIngredients] = useDrop({
      accept: "ingredient",
      collect: (monitor) => ({
        isHoverAllIngredients: monitor.isOver(),
      }),
      drop(ingredient) {
        dispatch(addIngridient(ingredient));
      },
    });
    const [{ isHoverBun }, dropTargetBun] = useDrop({
      accept: EIngredientType.BUN,
      drop(ingredient) {
        dispatch({
          type: SET_BUN,
          bun: ingredient,
        });
      },
      collect: (monitor) => ({
        isHoverBun: monitor.isOver(),
      }),
    });
    const [state, setState] = useState<TState>({
      widthScreen: window.innerWidth,
      isDesctop: isDesctop(),
      heightBlok: window.innerHeight,
    });
    const { bun, burgerConstructor } = useSelector(
      (store) => store.burgerConstructor
    );
    useEffect(() => {
      function updateState(): void {
        setState({
          widthScreen: window.innerWidth,
          isDesctop: isDesctop(),
          heightBlok: window.innerHeight,
        });
      }
      window.addEventListener("resize", updateState);
      return () => window.removeEventListener("resize", updateState);
    }, []);

    function getIndents(ingredient: TIngredientForIndents): string {
      let indents: string = "";

      if (ingredient.type === "bun") {
        indents = "pl-8 ";
        if (ingredient.place === "top") {
          indents += "mb-4 ";
        } else {
          indents += "mt-4 ";
        }
      } else {
        indents += "mb-4 ";
      }
      return indents;
    }

    function isDesctop(): boolean {
      return window.innerWidth > 1280 ? true : false;
    }

    function setMaxHeight(): TMaxHeight {
      if (state.widthScreen < 1268) {
        if (state.widthScreen > 768) {
          return { maxHeight: `${state.heightBlok * 0.6}px` };
        } else {
          if (state.heightBlok > 800) {
            return { maxHeight: `${state.heightBlok * 0.48}px` };
          } else {
            return { maxHeight: `${state.heightBlok * 0.35}px` };
          }
        }
      } else {
        return { maxHeight: `${state.heightBlok * 0.4}px` };
      }
    }

    const stylesContainerAllIngredients: TMaxHeight & { border: string } = {
      ...setMaxHeight(),
      border: isHoverAllIngredients
        ? "2px solid #4c4cff"
        : "2px solid transparent",
    };

    return (
      <>
        {!state.isDesctop && (
          <header className={styles.headerOrder}>
            <h1 className="mt-4 text text_type_main-large">Заказ</h1>
            <button
              className={styles.headerButtonClose}
              onClick={closeBurgerConstructor}
            >
              <CloseIcon type="primary" />
            </button>
          </header>
        )}

        <div
          ref={dropTargetBun}
          style={{
            border: isHoverBun ? "2px solid #4c4cff" : "2px solid transparent",
          }}
          className={styles.containerToBun}
        >
          {bun?.ingredient ? (
            <BurgerConstructorIngredient
              isDesctop={state.isDesctop}
              ingredient={{
                ...bun?.ingredient,
                name: `${bun?.ingredient.name} (верх)`,
              }}
              typeBun="top"
              indents={getIndents({
                type: EIngredientType.BUN,
                place: "top",
              })}
            />
          ) : (
            <BurgerConstructorIngredientAlternate place={"top"}>
              Перенесите булку для заказа сюда
            </BurgerConstructorIngredientAlternate>
          )}
        </div>

        <div
          ref={dropTargetAllIngredients}
          style={stylesContainerAllIngredients}
          className={`drop ${styles.ingredients}`}
        >
          {burgerConstructor.map(
            (
              item: TIngredientWithUniqueId,
              index: number,
              array: Array<TIngredientWithUniqueId>
            ) => {
              return (
                <BurgerConstructorIngredient
                  key={item.uniqueId}
                  uniqueId={item.uniqueId}
                  positionList={index}
                  isDesctop={state.isDesctop}
                  ingredient={item.ingredient}
                  indents={
                    index !== array.length - 1
                      ? getIndents({
                          type: item.ingredient.type,
                          place: null,
                        })
                      : ""
                  }
                />
              );
            }
          )}
        </div>

        <div className={styles.containerToBun}>
          {bun?.ingredient ? (
            <BurgerConstructorIngredient
              isDesctop={state.isDesctop}
              ingredient={{
                ...bun?.ingredient,
                name: `${bun?.ingredient.name} (низ)`,
              }}
              typeBun="bottom"
              indents={getIndents({
                type: EIngredientType.BUN,
                place: "bottom",
              })}
            />
          ) : (
            <BurgerConstructorIngredientAlternate place={"bottom"}>
              Здесь будет нижняя булка
            </BurgerConstructorIngredientAlternate>
          )}
        </div>

        <ConfirmOrder
          size={state.isDesctop ? "large" : "small"}
          textButton={state.isDesctop ? "Оформить заказ" : "Заказать"}
          className={styles.confirmOrder}
          section={"BurgerConstructor"}
        />
      </>
    );
  }
);

export default BurgerConstructor;
