import {
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS,
} from "../actions/ingredient-details";

const initialState = {
  ingredientDetails: {},
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_DETAILS:
      return {
        ...state,
        ingredientDetails: action.ingredientDetails,
      };
    case REMOVE_INGREDIENT_DETAILS:
      return {
        ...state,
        ingredientDetails: {},
      };
    default:
      return state;
  }
};
