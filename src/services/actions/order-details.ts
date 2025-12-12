import { AppDispatch, AppThunk } from "../../utils/additionalStorageTyping";
import { EMethod } from "../../utils/consts";
import { getCookie } from "../../utils/cookie";
import { doRequest } from "../../utils/doRequest";
import { TOrder, TOrderDetails } from "../../utils/types";
import { CLEAR_CONSTRUCTOR } from "./burger-constructor";

export const CREATE_NEW_ORDER_REQUEST: "CREATE_NEW_ORDER_REQUEST" =
  "CREATE_NEW_ORDER_REQUEST";
export const CREATE_NEW_ORDER_REQUEST_SUCCESS: "CREATE_NEW_ORDER_REQUEST_SUCCESS" =
  "CREATE_NEW_ORDER_REQUEST_SUCCESS";
export const CREATE_NEW_ORDER_REQUEST_ERROR: "CREATE_NEW_ORDER_REQUEST_ERROR" =
  "CREATE_NEW_ORDER_REQUEST_ERROR";

export const ADD_ORDER: "ADD_ORDER" = "ADD_ORDER";
export const REMOVE_ORDER: "REMOVE_ORDER" = "REMOVE_ORDER";

export const GET_ORDER_BY_ID_REQUEST: "GET_ORDER_BY_ID_REQUEST" =
  "GET_ORDER_BY_ID_REQUEST";
export const GET_ORDER_BY_ID_REQUEST_ERROR: "GET_ORDER_BY_ID_REQUEST_ERROR" =
  "GET_ORDER_BY_ID_REQUEST_ERROR";
export const GET_ORDER_BY_ID_REQUEST_SUCCESS: "GET_ORDER_BY_ID_REQUEST_SUCCESS" =
  "GET_ORDER_BY_ID_REQUEST_SUCCESS";

export interface IAddOrderAction {
  readonly type: typeof ADD_ORDER;
  readonly orderForViewing: TOrder;
}
export interface IRemoveOrderAction {
  readonly type: typeof REMOVE_ORDER;
}
export interface IGetOrderByIdRequestAction {
  readonly type: typeof GET_ORDER_BY_ID_REQUEST;
}
export interface IGetOrderByIdRequestErrorAction {
  readonly type: typeof GET_ORDER_BY_ID_REQUEST_ERROR;
}
export interface IGetOrderByIdRequestSuccessAction {
  readonly type: typeof GET_ORDER_BY_ID_REQUEST_SUCCESS;
  readonly orderForViewing: TOrder;
}
export interface ICreateNewOrderRequestAction {
  readonly type: typeof CREATE_NEW_ORDER_REQUEST;
}
export interface ICreateNewOrderRequestErrorAction {
  readonly type: typeof CREATE_NEW_ORDER_REQUEST_ERROR;
}
export interface ICreateNewOrderRequestSuccessAction {
  readonly type: typeof CREATE_NEW_ORDER_REQUEST_SUCCESS;
  readonly orderDetails: TOrderDetails;
}

export type TOrderDetailsActions =
  | ICreateNewOrderRequestAction
  | ICreateNewOrderRequestErrorAction
  | ICreateNewOrderRequestSuccessAction
  | IAddOrderAction
  | IRemoveOrderAction
  | IGetOrderByIdRequestAction
  | IGetOrderByIdRequestErrorAction
  | IGetOrderByIdRequestSuccessAction;

export const createNewOrder: AppThunk = (arrayIngredientsIds: string[]) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: CREATE_NEW_ORDER_REQUEST,
    });

    const option = {
      method: EMethod.POST,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify({
        ingredients: arrayIngredientsIds,
      }),
    };

    doRequest("/orders", option)
      .then((json) => {
        dispatch({
          type: CLEAR_CONSTRUCTOR,
        });
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

export const getOrderById: AppThunk = (orderNumber) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_BY_ID_REQUEST,
    });

    const option = {
      method: EMethod.GET,
      headers: {
        "Content-Type": "application/json",
      },
    };

    doRequest(`/orders/${orderNumber}`, option)
      .then((json) => {
        dispatch({
          type: GET_ORDER_BY_ID_REQUEST_SUCCESS,
          orderForViewing: json.orders[0],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_ORDER_BY_ID_REQUEST_ERROR,
        });
      });
  };
};
