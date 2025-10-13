import {
  CREATE_NEW_ORDER_REQUEST,
  CREATE_NEW_ORDER_REQUEST_SUCCESS,
  CREATE_NEW_ORDER_REQUEST_ERROR,
} from "../actions/order-details";

const initialState = {
  orderDetails: {},
  orderDetailsRequest: false,
  orderDetailsRequestFailed: false,
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_ORDER_REQUEST:
      return {
        ...state,
        orderDetailsRequest: true,
        orderDetailsRequestFailed: false,
      };
    case CREATE_NEW_ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        orderDetailsRequest: false,
        orderDetailsRequestFailed: false,
        orderDetails: action.orderDetails,
      };
    case CREATE_NEW_ORDER_REQUEST_ERROR:
      return {
        ...state,
        orderDetailsRequest: false,
        orderDetailsRequestFailed: true,
        orderDetails: {},
      };
    default:
      return state;
  }
};
