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
import { orderDetailsReducer } from "./order-details";

describe("orderDetailsReducer tests", () => {
  it("should return the initial state", () => {
    expect(orderDetailsReducer(undefined, {})).toEqual({
      orderDetails: null,
      orderDetailsRequest: false,
      orderDetailsRequestFailed: false,

      orderForViewing: null,
      getOrderByIdRequest: false,
      getOrderByIdRequestError: false,
    });
  });
  it("should handle CREATE_NEW_ORDER_REQUEST", () => {
    expect(
      orderDetailsReducer(
        {
          orderDetails: null,
          orderDetailsRequest: false,
          orderDetailsRequestFailed: false,

          orderForViewing: null,
          getOrderByIdRequest: false,
          getOrderByIdRequestError: false,
        },
        {
          type: CREATE_NEW_ORDER_REQUEST,
        }
      )
    ).toEqual({
      orderDetails: null,
      orderDetailsRequest: true,
      orderDetailsRequestFailed: false,

      orderForViewing: null,
      getOrderByIdRequest: false,
      getOrderByIdRequestError: false,
    });
  });
  it("should handle CREATE_NEW_ORDER_REQUEST_ERROR", () => {
    expect(
      orderDetailsReducer(
        {
          orderDetails: null,
          orderDetailsRequest: true,
          orderDetailsRequestFailed: false,

          orderForViewing: null,
          getOrderByIdRequest: false,
          getOrderByIdRequestError: false,
        },
        {
          type: CREATE_NEW_ORDER_REQUEST_ERROR,
        }
      )
    ).toEqual({
      orderDetails: null,
      orderDetailsRequest: false,
      orderDetailsRequestFailed: true,

      orderForViewing: null,
      getOrderByIdRequest: false,
      getOrderByIdRequestError: false,
    });
  });
  it("should handle CREATE_NEW_ORDER_REQUEST_SUCCESS", () => {
    expect(
      orderDetailsReducer(
        {
          orderDetails: null,
          orderDetailsRequest: true,
          orderDetailsRequestFailed: false,

          orderForViewing: null,
          getOrderByIdRequest: false,
          getOrderByIdRequestError: false,
        },
        {
          type: CREATE_NEW_ORDER_REQUEST_SUCCESS,
          orderDetails: {
            name: "Космобургер",
            order: {
              number: 1234,
            },
            success: true,
          },
        }
      )
    ).toEqual({
      orderDetails: {
        name: "Космобургер",
        order: {
          number: 1234,
        },
        success: true,
      },
      orderDetailsRequest: false,
      orderDetailsRequestFailed: false,

      orderForViewing: null,
      getOrderByIdRequest: false,
      getOrderByIdRequestError: false,
    });
  });
  it("should handle GET_ORDER_BY_ID_REQUEST", () => {
    expect(
      orderDetailsReducer(
        {
          orderDetails: null,
          orderDetailsRequest: false,
          orderDetailsRequestFailed: false,

          orderForViewing: null,
          getOrderByIdRequest: false,
          getOrderByIdRequestError: false,
        },
        {
          type: GET_ORDER_BY_ID_REQUEST,
        }
      )
    ).toEqual({
      orderDetails: null,
      orderDetailsRequest: false,
      orderDetailsRequestFailed: false,

      orderForViewing: null,
      getOrderByIdRequest: true,
      getOrderByIdRequestError: false,
    });
  });
  it("should handle GET_ORDER_BY_ID_REQUEST_ERROR", () => {
    expect(
      orderDetailsReducer(
        {
          orderDetails: null,
          orderDetailsRequest: false,
          orderDetailsRequestFailed: false,

          orderForViewing: null,
          getOrderByIdRequest: true,
          getOrderByIdRequestError: false,
        },
        {
          type: GET_ORDER_BY_ID_REQUEST_ERROR,
        }
      )
    ).toEqual({
      orderDetails: null,
      orderDetailsRequest: false,
      orderDetailsRequestFailed: false,

      orderForViewing: null,
      getOrderByIdRequest: false,
      getOrderByIdRequestError: true,
    });
  });
  it("should handle GET_ORDER_BY_ID_REQUEST_SUCCESS", () => {
    expect(
      orderDetailsReducer(
        {
          orderDetails: null,
          orderDetailsRequest: false,
          orderDetailsRequestFailed: false,

          orderForViewing: null,
          getOrderByIdRequest: true,
          getOrderByIdRequestError: false,
        },
        {
          type: GET_ORDER_BY_ID_REQUEST_SUCCESS,
          orderForViewing: {
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
          },
        }
      )
    ).toEqual({
      orderDetails: null,
      orderDetailsRequest: false,
      orderDetailsRequestFailed: false,

      orderForViewing: {
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
      },
      getOrderByIdRequest: false,
      getOrderByIdRequestError: false,
    });
  });
  it("should handle ADD_ORDER", () => {
    expect(
      orderDetailsReducer(
        {
          orderDetails: null,
          orderDetailsRequest: false,
          orderDetailsRequestFailed: false,

          orderForViewing: null,
          getOrderByIdRequest: false,
          getOrderByIdRequestError: false,
        },
        {
          type: ADD_ORDER,
          orderForViewing: {
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
          },
        }
      )
    ).toEqual({
      orderDetails: null,
      orderDetailsRequest: false,
      orderDetailsRequestFailed: false,

      orderForViewing: {
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
      },
      getOrderByIdRequest: false,
      getOrderByIdRequestError: false,
    });
  });
  it("should handle REMOVE_ORDER", () => {
    expect(
      orderDetailsReducer(
        {
          orderDetails: null,
          orderDetailsRequest: false,
          orderDetailsRequestFailed: false,

          orderForViewing: {
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
          },
          getOrderByIdRequest: false,
          getOrderByIdRequestError: false,
        },
        {
          type: REMOVE_ORDER,
        }
      )
    ).toEqual({
      orderDetails: null,
      orderDetailsRequest: false,
      orderDetailsRequestFailed: false,

      orderForViewing: null,
      getOrderByIdRequest: false,
      getOrderByIdRequestError: false,
    });
  });
});
