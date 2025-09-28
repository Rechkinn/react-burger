import React from "react";
import styles from "./burger-ingredients-card.module.css";
import {
  Counter,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

class BurgerIngredientsCard extends React.Component {
  state = {
    currentDevice: window.innerWidth > 768 ? "notMobile" : "mobile",
  };

  updateImageCard() {
    if (window.innerWidth > 768) {
      this.setState({ currentDevice: "notMobile" });
    } else {
      this.setState({ currentDevice: "mobile" });
    }
  }

  componentDidMount() {
    window.addEventListener("resize", () => this.updateImageCard());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateImageCard());
  }

  render() {
    return (
      <article className={`mb-8 ${styles.card}`}>
        <img
          src={
            this.state.currentDevice === "mobile"
              ? this.props.ingredient.image_mobile
              : this.props.ingredient.image
          }
          alt={this.props.ingredient.name}
          className={`mb-1 ${styles.image}`}
        />
        <p className={`mb-1 ${styles.price}`}>
          <span className="mr-2 text text_type_digits-default">
            {this.props.ingredient.price}
          </span>
          <CurrencyIcon />
        </p>
        <h3 className="mb-5 text text_type_main-small">
          {this.props.ingredient.name}
        </h3>
        <Button htmlType="button" type="secondary" size="small">
          Добавить
        </Button>
        <Counter />
      </article>
    );
  }
}

export default BurgerIngredientsCard;

BurgerIngredientsCard.propTypes = {
  ingridient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  }).isRequired,
  key: PropTypes.string.isRequired,
};
