import { useEffect, useState } from "react";
import BurgerConstructorIngredient from "../burger-constructor-ingredient/burger-constructor-ingredient";
import ConfirmOrder from "../confirm-order/confirm-order";
import styles from "./burger-constructor.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes, { func } from "prop-types";
import { IngredientType } from "../../utils/types";
import { BUN } from "../../utils/consts";
import { useDispatch, useSelector } from "react-redux";
import { SET_ACTIVE_SECTION } from "../../services/actions/active-section";
import { useDrop } from "react-dnd";
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  SET_BUN,
} from "../../services/actions/burger-constructor";

function BurgerConstructor() {
  const dispatch = useDispatch();

  const [{ isHoverAllIngredients }, dropTargetAllIngredients] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHoverAllIngredients: monitor.isOver(),
    }),
    drop(ingredient) {
      dispatch({
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        ingredient,
      });
    },
  });

  // const [{ isHoverBun }, dropTargetBun] = useDrop({
  //   accept: BUN,
  //   drop(ingredient) {
  //     dispatch({
  //       type: SET_BUN,
  //       bun: ingredient,
  //     });
  //   },
  //   collect: (monitor) => ({
  //     isHoverBun: monitor.isOver(),
  //   }),
  // });

  const [state, setState] = useState({
    widthScreen: window.innerWidth,
    isDesctop: isDesctop(),
    heightBlok: window.innerHeight,
  });

  const { bun, burgerConstructor } = useSelector(
    (store) => store.burgerConstructor
  );
  const { burgerIngredients } = useSelector((store) => store.burgerIngredients);
  // console.log("burgerConstructor", burgerConstructor);
  // const { activeSection } = useSelector((store) => store.activeSection);

  useEffect(() => {
    // for (let i = 0; i < burgerIngredients.length; i++) {
    //   if (burgerIngredients[i].type === BUN) {
    //     console.log("montirovanie");
    //     dispatch({
    //       type: SET_BUN,
    //       bun: burgerIngredients[i],
    //     });
    //   }
    // }

    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, []);

  function setActiveSection(section) {
    dispatch({
      type: SET_ACTIVE_SECTION,
      activeSection: section,
    });
  }

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

  function getIngredientsWithoutBuns() {
    const array = [
      ...burgerConstructor.filter((ingredient) => {
        if (ingredient.ingredient.type !== BUN) return ingredient.ingredient;
      }),
    ];
    // console.log("перед рендером -- ", array);
    return array;
  }

  function setInitialBun() {
    for (let i = 0; i < burgerIngredients.length; i++) {
      if (burgerIngredients[i].type === BUN) {
        console.log("montirovanie");
        dispatch({
          type: SET_BUN,
          bun: burgerIngredients[i],
        });
      }
    }
  }

  // const stylesContainerBun = {
  //   border: isHoverBun ? "2px solid #4c4cff" : "2px solid transparent",
  // };
  const stylesContainerAllIngredients = {
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
            onClick={setActiveSection("BurgerIngredients")}
          >
            <CloseIcon />
          </button>
        </header>
      )}

      <div
        // ref={dropTargetBun}
        // style={stylesContainerBun}
        className={styles.containerToBun}
      >
        {/* {bun ? (
          <BurgerConstructorIngredient
            isDesctop={state.isDesctop}
            ingredient={{ ...bun, name: `${bun.name} (верх)` }}
            typeBun="top"
            indents={getIndents({
              type: BUN,
              place: "top",
            })}
          />
        ) : (
          setInitialBun()
        )} */}
      </div>

      <div
        ref={dropTargetAllIngredients}
        style={stylesContainerAllIngredients}
        className={styles.ingredients}
      >
        {/* {burgerConstructor.map((ingredient, index, array) => { */}
        {getIngredientsWithoutBuns().map((ingredient, index, array) => {
          return (
            <BurgerConstructorIngredient
              key={`${ingredient.ingredient._id}${index}`}
              isDesctop={state.isDesctop}
              ingredient={ingredient.ingredient}
              indents={
                index !== array.length - 1
                  ? getIndents({
                      type: ingredient.ingredient.type,
                      place: null,
                    })
                  : ""
              }
            />
          );
        })}
      </div>

      <div
        // ref={dropTargetBun}
        // style={stylesContainerBun}
        className={styles.containerToBun}
      >
        {/* {bun ? (
          <BurgerConstructorIngredient
            isDesctop={state.isDesctop}
            ingredient={{ ...bun, name: `${bun.name} (низ)` }}
            typeBun="bottom"
            indents={getIndents({
              type: BUN,
              place: "bottom",
            })}
          />
        ) : (
          setInitialBun()
        )} */}
      </div>

      <ConfirmOrder
        size={state.isDesctop ? "large" : "small"}
        textButton={state.isDesctop ? "Оформить заказ" : "Заказать"}
        className={styles.confirmOrder}
        section={"BurgerConstructor"}
        // ingredients={arrayOfIngredients}
        // objectToOpenSectionBurgerConstructor={{
        //   currentSection: "BurgerConstructor",
        //   func: null,
        // }}
      />
    </>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  arrayOfIngredients: PropTypes.arrayOf(IngredientType).isRequired,
  closeBurgerConstructor: PropTypes.func.isRequired,
};
