import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../actions/web-socket";
import { wsReducer, initialState } from "./web-socket";

const ingredientsIds = ["60d3463f7034a000269f45e9", "60d3463f7034a000269f45e7"];

const order = {
  ingredients: ingredientsIds,
  _id: "",
  status: "done",
  number: 1,
  createdAt: "2021-06-23T20:11:01.403Z",
  updatedAt: "2021-06-23T20:11:01.406Z",
  name: "Космический",
};

const order2 = {
  ...order,
  ingredients: ["60d3463f7034a000269f45e9"],
  number: 123,
};

const message = {
  orders: [order, order2],
  total: 2,
  totalToday: 2,
};

describe("wsReducer tests", () => {
  it("should return the initial state", () => {
    expect(wsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      wsReducer(
        {
          ...initialState,
          wsConnected: true,
        },
        {
          type: WS_CONNECTION_CLOSED,
        }
      )
    ).toEqual({
      ...initialState,
      error: undefined,
    });
  });
  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      wsReducer(
        {
          ...initialState,
          wsConnected: true,
        },
        {
          type: WS_CONNECTION_ERROR,
        }
      )
    ).toEqual(initialState);
  });
  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      wsReducer(initialState, {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      wsConnected: true,
      error: undefined,
    });
  });
  it("should handle WS_GET_MESSAGE", () => {
    expect(
      wsReducer(
        {
          ...initialState,
          wsConnected: true,
        },
        {
          type: WS_GET_MESSAGE,
          payload: message,
        }
      )
    ).toEqual({
      wsConnected: true,
      error: undefined,
      messages: [message],
    });
  });
});
