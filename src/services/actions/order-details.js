export const CREATE_NEW_ORDER_REQUEST = "CREATE_NEW_ORDER_REQUEST";
export const CREATE_NEW_ORDER_REQUEST_SUCCESS =
  "CREATE_NEW_ORDER_REQUEST_SUCCESS";
export const CREATE_NEW_ORDER_REQUEST_ERROR = "CREATE_NEW_ORDER_REQUEST_FAILED";

const url = `https://norma.nomoreparties.space`;

export const createNewOrder = (arrayIngredientsIds) => {
  return function (dispatch) {
    dispatch({
      type: CREATE_NEW_ORDER_REQUEST,
    });

    fetch(`${url}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: arrayIngredientsIds,
      }),
    })
      .then((response) => {
        console.log("ЗАКАЗ ---", response);
        if (response && response.success) {
          dispatch({
            type: CREATE_NEW_ORDER_REQUEST_SUCCESS,
            orderDetails: response.json(),
          });
        } else {
          dispatch({
            type: CREATE_NEW_ORDER_REQUEST_ERROR,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: CREATE_NEW_ORDER_REQUEST_ERROR,
        });
      });
  };
};
