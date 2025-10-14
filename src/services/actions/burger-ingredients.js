import { BASE_URL } from "../../utils/consts";

export const GET_BURGER_INGREDIENTS_REQUEST = "GET_BURGER_INGREDIENTS";
export const GET_BURGER_INGREDIENTS_REQUEST_SUCCESS =
  "GET_BURGER_INGREDIENTS_REQUEST_SUCCESS";
export const GET_BURGER_INGREDIENTS_REQUEST_ERROR =
  "GET_BURGER_INGREDIENTS_REQUEST_FAILED";

export function getBurgerIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_BURGER_INGREDIENTS_REQUEST,
    });

    fetch(`${BASE_URL}/ingredients`)
      .then((response) => {
        if (response && response.ok) {
          return response.json();
        } else {
          dispatch({
            type: GET_BURGER_INGREDIENTS_REQUEST_ERROR,
          });
        }
      })
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
