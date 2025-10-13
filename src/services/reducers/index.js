import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { ingredientDetailsReducer } from "./ingredient-details";
import { orderDetailsReducer } from "./order-details";
import { burderConstructorReducer } from "./burger-constructor";
import { activeSectionReduce } from "./active-section";
import { modalReducer } from "./modal";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burderConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  activeSection: activeSectionReduce,
  modal: modalReducer,
});
