import {
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS,
} from "../actions/ingredient-details";
import { ingredientDetailsReducer } from "./ingredient-details";

describe("ingredientDetailsReducer tests", () => {
  it("should return the initial state", () => {
    expect(ingredientDetailsReducer(undefined, {})).toEqual({
      ingredientDetails: null,
    });
  });
  it("should handle ADD_INGREDIENT_DETAILS", () => {
    expect(
      ingredientDetailsReducer(
        {
          ingredientDetails: null,
        },
        {
          type: ADD_INGREDIENT_DETAILS,
          ingredientDetails: {
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
          },
        }
      )
    ).toEqual({
      ingredientDetails: {
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
      },
    });
  });
  it("should handle REMOVE_INGREDIENT_DETAILS", () => {
    expect(
      ingredientDetailsReducer(
        {
          ingredientDetails: {
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
          },
        },
        {
          type: REMOVE_INGREDIENT_DETAILS,
        }
      )
    ).toEqual({
      ingredientDetails: null,
    });
  });
});
