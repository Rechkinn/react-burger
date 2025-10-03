import { useEffect, useState } from "react";
import BurgerConstructorIngredient from "../burger-constructor-ingredient/burger-constructor-ingredient";
import ConfirmOrder from "../confirm-order/confirm-order";
import styles from "./burger-constructor.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/types";
import { BUN } from "../../utils/consts";

function BurgerConstructor({ arrayOfIngredients, closeBurgerConstructor }) {
  const [state, setState] = useState({
    widthScreen: window.innerWidth,
    isDesctop: isDesctop(),
    heightBlok: window.innerHeight,
  });

  useEffect(() => {
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, []);

  function getIndents(ingredient) {
    let indents = "";

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

  function isDesctop() {
    return window.innerWidth > 1280 ? true : false;
  }

  function updateState() {
    setState({
      widthScreen: window.innerWidth,
      isDesctop: isDesctop(),
      heightBlok: window.innerHeight,
    });
  }

  function setMaxHeight() {
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

  return (
    <>
      {!state.isDesctop && (
        <header className={styles.headerOrder}>
          <h1 className="mt-4 text text_type_main-large">Заказ</h1>
          <button
            className={styles.headerButtonClose}
            onClick={closeBurgerConstructor}
          >
            <CloseIcon />
          </button>
        </header>
      )}

      <BurgerConstructorIngredient
        isDesctop={state.isDesctop}
        ingredient={{
          ...arrayOfIngredients[0],
          name: `${arrayOfIngredients[0].name} (верх)`,
        }}
        typeBun="top"
        indents={getIndents({
          type: arrayOfIngredients[0].type,
          place: "top",
        })}
      />

      <div style={setMaxHeight()} className={styles.ingredients}>
        {[...arrayOfIngredients]
          .filter((ingredient) => {
            if (ingredient.type !== BUN) return ingredient;
          })
          .map((ingredient, index, array) => {
            return (
              <BurgerConstructorIngredient
                isDesctop={state.isDesctop}
                key={ingredient._id}
                ingredient={ingredient}
                indents={
                  index !== array.length - 1
                    ? getIndents({
                        type: ingredient.type,
                        place: null,
                      })
                    : ""
                }
              />
            );
          })}
      </div>
      <BurgerConstructorIngredient
        isDesctop={state.isDesctop}
        ingredient={{
          ...arrayOfIngredients[0],
          name: `${arrayOfIngredients[0].name} (низ)`,
        }}
        typeBun="bottom"
        indents={getIndents({
          type: arrayOfIngredients[0].type,
          place: "bottom",
        })}
      />

      {state.widthScreen > 1280 ? (
        <ConfirmOrder
          size={"large"}
          textButton={"Оформить заказ"}
          className={styles.confirmOrder}
          ingredients={arrayOfIngredients}
          objectToOpenSectionBurgerConstructor={{
            currentSection: "BurgerConstructor",
            func: null,
          }}
        />
      ) : (
        <ConfirmOrder
          size={"small"}
          textButton={"Заказать"}
          className={styles.confirmOrder}
          ingredients={arrayOfIngredients}
          objectToOpenSectionBurgerConstructor={{
            currentSection: "BurgerConstructor",
            func: null,
          }}
        />
      )}
    </>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  arrayOfIngredients: PropTypes.arrayOf(IngredientType).isRequired,
  closeBurgerConstructor: PropTypes.func.isRequired,
};
