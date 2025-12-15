import {
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS,
} from "../actions/ingredient-details";
import { ingredientDetailsReducer, initialState } from "./ingredient-details";

const ingredientDetails = {
  _id: "1",
  name: "Котлета",
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

describe("ingredientDetailsReducer tests", () => {
  it("should return the initial state", () => {
    expect(ingredientDetailsReducer(undefined, {})).toEqual(initialState);
  });
  it("should handle ADD_INGREDIENT_DETAILS", () => {
    expect(
      ingredientDetailsReducer(initialState, {
        type: ADD_INGREDIENT_DETAILS,
        ingredientDetails: ingredientDetails,
      })
    ).toEqual({
      ingredientDetails: ingredientDetails,
    });
  });
  it("should handle REMOVE_INGREDIENT_DETAILS", () => {
    expect(
      ingredientDetailsReducer(
        {
          ingredientDetails: ingredientDetails,
        },
        {
          type: REMOVE_INGREDIENT_DETAILS,
        }
      )
    ).toEqual(initialState);
  });
});
