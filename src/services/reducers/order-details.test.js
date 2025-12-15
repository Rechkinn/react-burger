import {
  CREATE_NEW_ORDER_REQUEST,
  CREATE_NEW_ORDER_REQUEST_SUCCESS,
  CREATE_NEW_ORDER_REQUEST_ERROR,
  ADD_ORDER,
  REMOVE_ORDER,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_REQUEST_ERROR,
  GET_ORDER_BY_ID_REQUEST_SUCCESS,
} from "../actions/order-details";
import { orderDetailsReducer, initialState } from "./order-details";

const orderDetails = {
  name: "Космобургер",
  order: {
    number: 1234,
  },
  success: true,
};

const orderForViewing = {
  ingredients: [
    "60d3463f7034a000269f45e7",
    "60d3463f7034a000269f45e9",
    "60d3463f7034a000269f45e8",
    "60d3463f7034a000269f45ea",
  ],
  _id: "",
  status: "done",
  number: 0,
  createdAt: "2021-06-23T14:43:22.587Z",
  updatedAt: "2021-06-23T14:43:22.603Z",
  name: "Космобургер",
};

describe("orderDetailsReducer tests", () => {
  it("should return the initial state", () => {
    expect(orderDetailsReducer(undefined, {})).toEqual(initialState);
  });
  it("should handle CREATE_NEW_ORDER_REQUEST", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: CREATE_NEW_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      orderDetailsRequest: true,
    });
  });
  it("should handle CREATE_NEW_ORDER_REQUEST_ERROR", () => {
    expect(
      orderDetailsReducer(
        {
          ...initialState,
          orderDetailsRequest: true,
        },
        {
          type: CREATE_NEW_ORDER_REQUEST_ERROR,
        }
      )
    ).toEqual({
      ...initialState,
      orderDetailsRequestFailed: true,
    });
  });
  it("should handle CREATE_NEW_ORDER_REQUEST_SUCCESS", () => {
    expect(
      orderDetailsReducer(
        {
          ...initialState,
          orderDetailsRequest: true,
        },
        {
          type: CREATE_NEW_ORDER_REQUEST_SUCCESS,
          orderDetails: orderDetails,
        }
      )
    ).toEqual({
      ...initialState,
      orderDetails: orderDetails,
    });
  });
  it("should handle GET_ORDER_BY_ID_REQUEST", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: GET_ORDER_BY_ID_REQUEST,
      })
    ).toEqual({
      ...initialState,
      getOrderByIdRequest: true,
    });
  });
  it("should handle GET_ORDER_BY_ID_REQUEST_ERROR", () => {
    expect(
      orderDetailsReducer(
        {
          ...initialState,
          getOrderByIdRequest: true,
        },
        {
          type: GET_ORDER_BY_ID_REQUEST_ERROR,
        }
      )
    ).toEqual({
      ...initialState,
      getOrderByIdRequestError: true,
    });
  });
  it("should handle GET_ORDER_BY_ID_REQUEST_SUCCESS", () => {
    expect(
      orderDetailsReducer(
        {
          ...initialState,
          getOrderByIdRequest: true,
        },
        {
          type: GET_ORDER_BY_ID_REQUEST_SUCCESS,
          orderForViewing: orderForViewing,
        }
      )
    ).toEqual({
      ...initialState,
      orderForViewing: orderForViewing,
    });
  });
  it("should handle ADD_ORDER", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: ADD_ORDER,
        orderForViewing: orderForViewing,
      })
    ).toEqual({
      ...initialState,
      orderForViewing: orderForViewing,
    });
  });
  it("should handle REMOVE_ORDER", () => {
    expect(
      orderDetailsReducer(
        {
          ...initialState,
          orderForViewing: orderForViewing,
        },
        {
          type: REMOVE_ORDER,
        }
      )
    ).toEqual(initialState);
  });
});
