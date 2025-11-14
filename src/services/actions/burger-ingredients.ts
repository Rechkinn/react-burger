import { doRequest } from "../../utils/doRequest";

export const GET_BURGER_INGREDIENTS_REQUEST = "GET_BURGER_INGREDIENTS";
export const GET_BURGER_INGREDIENTS_REQUEST_SUCCESS =
  "GET_BURGER_INGREDIENTS_REQUEST_SUCCESS";
export const GET_BURGER_INGREDIENTS_REQUEST_ERROR =
  "GET_BURGER_INGREDIENTS_REQUEST_ERROR";

export function getBurgerIngredients(): any {
  return function (dispatch: any) {
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
}
