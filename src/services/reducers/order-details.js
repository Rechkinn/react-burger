import {
  CREATE_NEW_ORDER_REQUEST,
  CREATE_NEW_ORDER_REQUEST_SUCCESS,
  CREATE_NEW_ORDER_REQUEST_ERROR,
} from "../actions/order-details";

const initialState = {
  orderDetails: null,
  orderDetailsRequest: false,
  orderDetailsRequestFailed: false,
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
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
