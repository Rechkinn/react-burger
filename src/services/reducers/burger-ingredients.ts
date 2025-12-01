import { TIngredient } from "../../utils/types";
import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_REQUEST_SUCCESS,
  GET_BURGER_INGREDIENTS_REQUEST_ERROR,
  TBurgerIngredientsActions,
} from "../actions/burger-ingredients";

type TBurgerIngredientsState = {
  burgerIngredients: TIngredient[];
  burgerIngredientsRequest: boolean;
  burgerIngredientsRequestFailed: boolean;
};

const initialState: TBurgerIngredientsState = {
  burgerIngredients: [],
  burgerIngredientsRequest: false,
  burgerIngredientsRequestFailed: false,
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: TBurgerIngredientsActions
): TBurgerIngredientsState => {
  switch (action.type) {
    case GET_BURGER_INGREDIENTS_REQUEST:
      return {
        ...state,
        burgerIngredientsRequestFailed: false,
        burgerIngredientsRequest: true,
      };
    case GET_BURGER_INGREDIENTS_REQUEST_SUCCESS:
      return {
        ...state,
        burgerIngredients: action.burgerIngredients,
        burgerIngredientsRequest: false,
        burgerIngredientsRequestFailed: false,
      };
    case GET_BURGER_INGREDIENTS_REQUEST_ERROR:
      return {
        ...state,
        burgerIngredients: [],
        burgerIngredientsRequest: false,
        burgerIngredientsRequestFailed: true,
      };
    default:
      return state;
  }
};
