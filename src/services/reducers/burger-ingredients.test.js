import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_REQUEST_SUCCESS,
  GET_BURGER_INGREDIENTS_REQUEST_ERROR,
} from "../actions/burger-ingredients";
import { burgerIngredientsReducer, initialState } from "./burger-ingredients";

const ingredient = {
  _id: "1",
  name: "Котлета 1",
  type: "main",
  proteins: 122,
  fat: 71,
  carbohydrates: 55,
  calories: 90,
  price: 2500,
  image: "url",
  image_mobile: "url",
  image_large: "url",
  __v: 1,
};

const burgerIngredients = [
  ingredient,
  {
    ...ingredient,
    _id: "2",
    name: "Котлета 2",
    __v: 2,
  },
  {
    _id: "3",
    name: "Котлета 3",
    __v: 3,
    ingredient,
  },
];

describe("burgerIngredientsReducer tests", () => {
  it("should return the initial state", () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_BURGER_INGREDIENTS_REQUEST", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_BURGER_INGREDIENTS_REQUEST,
      })
    ).toEqual({
      ...initialState,
      burgerIngredientsRequest: true,
    });
  });
  it("should handle GET_BURGER_INGREDIENTS_REQUEST_ERROR", () => {
    expect(
      burgerIngredientsReducer(
        {
          ...initialState,
          burgerIngredientsRequest: true,
        },
        {
          type: GET_BURGER_INGREDIENTS_REQUEST_ERROR,
        }
      )
    ).toEqual({
      ...initialState,
      burgerIngredientsRequestFailed: true,
    });
  });
  it("should handle GET_BURGER_INGREDIENTS_REQUEST_SUCCESS", () => {
    expect(
      burgerIngredientsReducer(
        {
          ...initialState,
          burgerIngredientsRequest: true,
        },
        {
          type: GET_BURGER_INGREDIENTS_REQUEST_SUCCESS,
          burgerIngredients: burgerIngredients,
        }
      )
    ).toEqual({
      ...initialState,
      burgerIngredients: burgerIngredients,
      burgerIngredientsRequest: false,
    });
  });
});
