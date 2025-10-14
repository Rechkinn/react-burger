import { doRequest } from "../../utils/doRequest";
export const CREATE_NEW_ORDER_REQUEST = "CREATE_NEW_ORDER_REQUEST";
export const CREATE_NEW_ORDER_REQUEST_SUCCESS =
  "CREATE_NEW_ORDER_REQUEST_SUCCESS";
export const CREATE_NEW_ORDER_REQUEST_ERROR = "CREATE_NEW_ORDER_REQUEST_FAILED";

export const createNewOrder = (arrayIngredientsIds) => {
  return function (dispatch) {
    dispatch({
      type: CREATE_NEW_ORDER_REQUEST,
    });

    const option = {
      method: "POST",
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
      })
      .catch(() => {
        dispatch({
          type: CREATE_NEW_ORDER_REQUEST_ERROR,
        });
      });
  };
};
