import { TOrder, TOrderDetails } from "../../utils/types";
import {
  CREATE_NEW_ORDER_REQUEST,
  CREATE_NEW_ORDER_REQUEST_SUCCESS,
  CREATE_NEW_ORDER_REQUEST_ERROR,
  TOrderDetailsActions,
  ADD_ORDER,
  REMOVE_ORDER,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_REQUEST_ERROR,
  GET_ORDER_BY_ID_REQUEST_SUCCESS,
} from "../actions/order-details";

type TOrderDetailsState = {
  orderDetails: TOrderDetails | null;
  orderDetailsRequest: boolean;
  orderDetailsRequestFailed: boolean;

  orderForViewing: TOrder | null;
  getOrderByIdRequest: boolean;
  getOrderByIdRequestError: boolean;
};

const initialState: TOrderDetailsState = {
  orderDetails: null,
  orderDetailsRequest: false,
  orderDetailsRequestFailed: false,

  orderForViewing: null,
  getOrderByIdRequest: false,
  getOrderByIdRequestError: false,
};

export const orderDetailsReducer = (
  state = initialState,
  action: TOrderDetailsActions
): TOrderDetailsState => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orderForViewing: { ...action.orderForViewing },
      };
    case REMOVE_ORDER:
      return {
        ...state,
        orderForViewing: null,
      };
    case GET_ORDER_BY_ID_REQUEST:
      return {
        ...state,
        getOrderByIdRequest: true,
        getOrderByIdRequestError: false,
      };
    case GET_ORDER_BY_ID_REQUEST_ERROR:
      return {
        ...state,
        getOrderByIdRequest: false,
        getOrderByIdRequestError: true,
      };
    case GET_ORDER_BY_ID_REQUEST_SUCCESS:
      return {
        ...state,
        orderForViewing: action.orderForViewing,
        getOrderByIdRequest: false,
        getOrderByIdRequestError: false,
      };
    case CREATE_NEW_ORDER_REQUEST:
      return {
        ...state,
        orderDetails: null,
        orderDetailsRequest: true,
        orderDetailsRequestFailed: false,
      };
    case CREATE_NEW_ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        orderDetails: action.orderDetails,
        orderDetailsRequest: false,
        orderDetailsRequestFailed: false,
      };
    case CREATE_NEW_ORDER_REQUEST_ERROR:
      return {
        ...state,
        orderDetails: null,
        orderDetailsRequest: false,
        orderDetailsRequestFailed: true,
      };
    default:
      return state;
  }
};
