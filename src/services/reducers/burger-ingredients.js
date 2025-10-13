import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_REQUEST_SUCCESS,
  GET_BURGER_INGREDIENTS_REQUEST_ERROR,
} from "../actions/burger-ingredients";

const initialState = {
  burgerIngredients: [],
  burgerIngredientsRequest: false,
  burgerIngredientsRequestFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
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
