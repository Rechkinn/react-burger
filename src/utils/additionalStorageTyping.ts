import { store } from "../index";
import { TBurgerIngredientsActions } from "../services/actions/burger-ingredients";
import { TBurgerConstructorActions } from "../services/actions/burger-constructor";
import { TForgotPasswordActions } from "../services/actions/forgot-password";
import { TIngredientDetailsActions } from "../services/actions/ingredient-details";
import { TLoginActions } from "../services/actions/login";
import { TLogoutActions } from "../services/actions/logout";
import { TOrderDetailsActions } from "../services/actions/order-details";
import { TRegisterActions } from "../services/actions/register";
import { TResetPasswordActions } from "../services/actions/reset-password";
import { TTokenActions } from "../services/actions/token";
import { TUserDataActions } from "../services/actions/user-data";
import { ActionCreator } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { TWSActions } from "../services/actions/web-socket";

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
export type TApplicationActions =
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TForgotPasswordActions
  | TIngredientDetailsActions
  | TLoginActions
  | TLogoutActions
  | TOrderDetailsActions
  | TRegisterActions
  | TResetPasswordActions
  | TTokenActions
  | TUserDataActions
  | TWSActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, unknown, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TApplicationActions
>;

// Теперь этот хук «знает» структуру хранилища
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// Хук не даст отправить экшен, который ему не знаком
export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>();
