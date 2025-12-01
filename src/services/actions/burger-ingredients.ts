import { AppDispatch, AppThunk } from "../../utils/additionalStorageTyping";
import { doRequest } from "../../utils/doRequest";
import { TIngredient } from "../../utils/types";

export const GET_BURGER_INGREDIENTS_REQUEST: "GET_BURGER_INGREDIENTS_REQUEST" =
  "GET_BURGER_INGREDIENTS_REQUEST";
export const GET_BURGER_INGREDIENTS_REQUEST_SUCCESS: "GET_BURGER_INGREDIENTS_REQUEST_SUCCESS" =
  "GET_BURGER_INGREDIENTS_REQUEST_SUCCESS";
export const GET_BURGER_INGREDIENTS_REQUEST_ERROR: "GET_BURGER_INGREDIENTS_REQUEST_ERROR" =
  "GET_BURGER_INGREDIENTS_REQUEST_ERROR";

export interface IGetBurgerIngredientsRequestAction {
  readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST;
}
export interface IGetBurgerIngredientsRequestSuccessAction {
  readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST_SUCCESS;
  readonly burgerIngredients: TIngredient[];
}
export interface IGetBurgerIngredientsRequestErrorAction {
  readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST_ERROR;
}

export type TBurgerIngredientsActions =
  | IGetBurgerIngredientsRequestAction
  | IGetBurgerIngredientsRequestSuccessAction
  | IGetBurgerIngredientsRequestErrorAction;

export const getBurgerIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_BURGER_INGREDIENTS_REQUEST,
    });

    doRequest("/ingredients")
      .then((json) => {
        dispatch({
          type: GET_BURGER_INGREDIENTS_REQUEST_SUCCESS,
          burgerIngredients: json.data,
        });
      })
      .catch(() =>
        dispatch({
          type: GET_BURGER_INGREDIENTS_REQUEST_ERROR,
        })
      );
  };
};
