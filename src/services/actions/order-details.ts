import { EMethod } from "../../utils/consts";
import { doRequest } from "../../utils/doRequest";
import { CLEAR_CONSTRUCTOR } from "./burger-constructor";
export const CREATE_NEW_ORDER_REQUEST = "CREATE_NEW_ORDER_REQUEST";
export const CREATE_NEW_ORDER_REQUEST_SUCCESS =
  "CREATE_NEW_ORDER_REQUEST_SUCCESS";
export const CREATE_NEW_ORDER_REQUEST_ERROR = "CREATE_NEW_ORDER_REQUEST_ERROR";

export const createNewOrder = (arrayIngredientsIds: string[]): any => {
  return function (dispatch: any) {
    dispatch({
      type: CREATE_NEW_ORDER_REQUEST,
    });

    const option = {
      method: EMethod.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: arrayIngredientsIds,
      }),
    };

    doRequest("/orders", option)
      .then((json) => {
        dispatch({
          type: CREATE_NEW_ORDER_REQUEST_SUCCESS,
          orderDetails: json,
        });
        dispatch({
          type: CLEAR_CONSTRUCTOR,
        });
      })
      .catch(() => {
        dispatch({
          type: CREATE_NEW_ORDER_REQUEST_ERROR,
        });
      });
  };
};
