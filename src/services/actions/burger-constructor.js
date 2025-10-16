import { v4 as uuid } from "uuid";

export const ADD_INGREDIENT_TO_CONSTRUCTOR = "ADD_INGREDIENT_TO_CONSTRUCTOR";
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR =
  "REMOVE_INGREDIENT_FROM_CONSTRUCTOR";
export const SET_BUN = "SET_BUN";
export const CHANGE_SUBSEQUENCE_BURGER_CONSTRUCTOR =
  "CHANGE_SUBSEQUENCE_BURGER_CONSTRUCTOR";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";

export const addIngridient = (item) => {
  return {
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    payload: {
      ...item,
      uniqueId: uuid(),
    },
  };
};
