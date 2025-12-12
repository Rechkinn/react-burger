import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_REQUEST_SUCCESS,
  GET_BURGER_INGREDIENTS_REQUEST_ERROR,
} from "../actions/burger-ingredients";
import { burgerIngredientsReducer } from "./burger-ingredients";

describe("burgerIngredientsReducer tests", () => {
  it("should return the initial state", () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual({
      burgerIngredients: [],
      burgerIngredientsRequest: false,
      burgerIngredientsRequestFailed: false,
    });
  });

  it("should handle GET_BURGER_INGREDIENTS_REQUEST", () => {
    expect(
      burgerIngredientsReducer(
        {
          burgerIngredients: [],
          burgerIngredientsRequest: false,
          burgerIngredientsRequestFailed: false,
        },
        {
          type: GET_BURGER_INGREDIENTS_REQUEST,
        }
      )
    ).toEqual({
      burgerIngredients: [],
      burgerIngredientsRequest: true,
      burgerIngredientsRequestFailed: false,
    });
  });
  it("should handle GET_BURGER_INGREDIENTS_REQUEST_ERROR", () => {
    expect(
      burgerIngredientsReducer(
        {
          burgerIngredients: [],
          burgerIngredientsRequest: false,
          burgerIngredientsRequestFailed: false,
        },
        {
          type: GET_BURGER_INGREDIENTS_REQUEST_ERROR,
        }
      )
    ).toEqual({
      burgerIngredients: [],
      burgerIngredientsRequest: false,
      burgerIngredientsRequestFailed: true,
    });
  });
  it("should handle GET_BURGER_INGREDIENTS_REQUEST_SUCCESS", () => {
    expect(
      burgerIngredientsReducer(
        {
          burgerIngredients: [],
          burgerIngredientsRequest: true,
          burgerIngredientsRequestFailed: false,
        },
        {
          type: GET_BURGER_INGREDIENTS_REQUEST_SUCCESS,
          burgerIngredients: [
            {
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
            },
            {
              _id: "2",
              name: "Котлета 2",
              type: "main",
              proteins: 122,
              fat: 71,
              carbohydrates: 55,
              calories: 90,
              price: 1500,
              image: "url",
              image_mobile: "url",
              image_large: "url",
              __v: 2,
            },
            {
              _id: "3",
              name: "Котлета 3",
              type: "main",
              proteins: 122,
              fat: 71,
              carbohydrates: 55,
              calories: 90,
              price: 2100,
              image: "url",
              image_mobile: "url",
              image_large: "url",
              __v: 3,
            },
          ],
        }
      )
    ).toEqual({
      burgerIngredients: [
        {
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
        },
        {
          _id: "2",
          name: "Котлета 2",
          type: "main",
          proteins: 122,
          fat: 71,
          carbohydrates: 55,
          calories: 90,
          price: 1500,
          image: "url",
          image_mobile: "url",
          image_large: "url",
          __v: 2,
        },
        {
          _id: "3",
          name: "Котлета 3",
          type: "main",
          proteins: 122,
          fat: 71,
          carbohydrates: 55,
          calories: 90,
          price: 2100,
          image: "url",
          image_mobile: "url",
          image_large: "url",
          __v: 3,
        },
      ],
      burgerIngredientsRequest: false,
      burgerIngredientsRequestFailed: false,
    });
  });
});
