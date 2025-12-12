import { TIngredient } from "../../utils/types";
import {
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS,
  TIngredientDetailsActions,
} from "../actions/ingredient-details";

type TIngredientDetailsState = {
  ingredientDetails: TIngredient | null;
};

const initialState: TIngredientDetailsState = {
  ingredientDetails: null,
};

export const ingredientDetailsReducer = (
  state = initialState,
  action: TIngredientDetailsActions
): TIngredientDetailsState => {
  switch (action.type) {
    case ADD_INGREDIENT_DETAILS:
      localStorage.setItem("ingredientDetails", action.ingredientDetails._id);
      return {
        ...state,
        ingredientDetails: action.ingredientDetails,
      };
    case REMOVE_INGREDIENT_DETAILS:
      localStorage.removeItem("ingredientDetails");
      return {
        ...state,
        ingredientDetails: null,
      };
    default:
      return state;
  }
};
