import React from "react";
import BurgerConstructorIngredient from "../burger-constructor-ingredient/burger-constructor-ingredient";
import ConfirmOrder from "../confirm-order/confirm-order";
import styles from "./burger-constructor.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/types";
import { BUN } from "../../utils/consts";

class BurgerConstructor extends React.Component {
  state = {
    widthScreen: window.innerWidth,
    isDesctop: this.isDesctop(),
    heightBlok: window.innerHeight,
  };

  getIndents(ingredient) {
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

  isDesctop() {
    return window.innerWidth > 1280 ? true : false;
  }

  updateState = () => {
    this.setState({
      widthScreen: window.innerWidth,
      isDesctop: this.isDesctop(),
      heightBlok: window.innerHeight,
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateState);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateState);
  }

  setMaxHeight() {
    if (this.state.widthScreen < 1268) {
      if (this.state.widthScreen > 768) {
        return { maxHeight: `${this.state.heightBlok * 0.6}px` };
      } else {
        if (this.state.heightBlok > 800) {
          return { maxHeight: `${this.state.heightBlok * 0.48}px` };
        } else {
          return { maxHeight: `${this.state.heightBlok * 0.35}px` };
        }
      }
    } else {
      return { maxHeight: `${this.state.heightBlok * 0.4}px` };
    }
  }

  render() {
    return (
      <>
        {!this.state.isDesctop && (
          <header className={styles.headerOrder}>
            <h1 className="mt-4 text text_type_main-large">Заказ</h1>
            <button
              className={styles.headerButtonClose}
              onClick={this.props.closeBurgerConstructor}
            >
              <CloseIcon />
            </button>
          </header>
        )}

        <BurgerConstructorIngredient
          isDesctop={this.state.isDesctop}
          ingredient={{
            ...this.props.arrayOfIngredients[0],
            name: `${this.props.arrayOfIngredients[0].name} (верх)`,
          }}
          typeBun="top"
          indents={this.getIndents({
            type: this.props.arrayOfIngredients[0].type,
            place: "top",
          })}
        />

        <div style={this.setMaxHeight()} className={styles.ingredients}>
          {[...this.props.arrayOfIngredients]
            .filter((ingredient) => {
              if (ingredient.type !== BUN) return ingredient;
            })
            .map((ingredient, index, array) => {
              return (
                <BurgerConstructorIngredient
                  isDesctop={this.state.isDesctop}
                  key={ingredient._id}
                  ingredient={ingredient}
                  indents={
                    index !== array.length - 1
                      ? this.getIndents({
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
          isDesctop={this.state.isDesctop}
          ingredient={{
            ...this.props.arrayOfIngredients[0],
            name: `${this.props.arrayOfIngredients[0].name} (низ)`,
          }}
          typeBun="bottom"
          indents={this.getIndents({
            type: this.props.arrayOfIngredients[0].type,
            place: "bottom",
          })}
        />

        {this.state.widthScreen > 1280 ? (
          <ConfirmOrder
            size={"large"}
            textButton={"Оформить заказ"}
            className={styles.confirmOrder}
            ingredients={this.props.arrayOfIngredients}
          />
        ) : (
          <ConfirmOrder
            size={"small"}
            textButton={"Заказать"}
            className={styles.confirmOrder}
            ingredients={this.props.arrayOfIngredients}
          />
        )}
      </>
    );
  }
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  arrayOfIngredients: PropTypes.arrayOf(IngredientType).isRequired,
  closeBurgerConstructor: PropTypes.func.isRequired,
};
