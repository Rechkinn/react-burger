import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { ingredientDetailsReducer } from "./ingredient-details";
import { orderDetailsReducer } from "./order-details";
import { burderConstructorReducer } from "./burger-constructor";
import { userDataReducer } from "./user-data";
import { registerReducer } from "./register";
import { tokenReducer } from "./token";
import { loginReducer } from "./login";
import { logoutReducer } from "./logout";
import { forgotPasswordReducer } from "./forgot-password";
import { resetPasswordReducer } from "./reset-password";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burderConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  userData: userDataReducer,
  register: registerReducer,
  token: tokenReducer,
  login: loginReducer,
  logout: logoutReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
});
