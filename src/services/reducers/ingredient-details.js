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
      localStorage.setItem("ingredientDetails", action.ingredientDetails._id);
      // localStorage.setItem("ingredientDetails", "fwef");
      return {
        ...state,
        ingredientDetails: action.ingredientDetails,
      };
    case REMOVE_INGREDIENT_DETAILS:
      localStorage.removeItem("ingredientDetails");
      return {
        ...state,
        ingredientDetails: {},
      };
    default:
      return state;
  }
};
