import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../actions/web-socket";
import { wsReducer } from "./web-socket";

describe("wsReducer tests", () => {
  it("should return the initial state", () => {
    expect(wsReducer(undefined, {})).toEqual({
      wsConnected: false,
      messages: [],
    });
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      wsReducer(
        {
          wsConnected: true,
          messages: [],
        },
        {
          type: WS_CONNECTION_CLOSED,
        }
      )
    ).toEqual({
      messages: [],
      error: undefined,
      wsConnected: false,
    });
  });
  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      wsReducer(
        {
          wsConnected: true,
          messages: [],
        },
        {
          type: WS_CONNECTION_ERROR,
        }
      )
    ).toEqual({
      wsConnected: false,
      messages: [],
    });
  });
  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      wsReducer(
        {
          wsConnected: false,
          messages: [],
        },
        {
          type: WS_CONNECTION_SUCCESS,
        }
      )
    ).toEqual({
      wsConnected: true,
      messages: [],
      error: undefined,
    });
  });
  it("should handle WS_GET_MESSAGE", () => {
    expect(
      wsReducer(
        {
          wsConnected: true,
          messages: [],
        },
        {
          type: WS_GET_MESSAGE,
          payload: {
            orders: [
              {
                ingredients: [
                  "60d3463f7034a000269f45e9",
                  "60d3463f7034a000269f45e7",
                ],
                _id: "",
                status: "done",
                number: 1,
                createdAt: "2021-06-23T20:11:01.403Z",
                updatedAt: "2021-06-23T20:11:01.406Z",
                name: "Космический",
              },
              {
                ingredients: ["60d3463f7034a000269f45e9"],
                _id: "",
                status: "done",
                number: 3,
                createdAt: "2021-06-23T20:13:23.654Z",
                updatedAt: "2021-06-23T20:13:23.657Z",
                name: "Галактический",
              },
            ],
            total: 2,
            totalToday: 2,
          },
        }
      )
    ).toEqual({
      wsConnected: true,
      error: undefined,
      messages: [
        {
          orders: [
            {
              ingredients: [
                "60d3463f7034a000269f45e9",
                "60d3463f7034a000269f45e7",
              ],
              _id: "",
              status: "done",
              number: 1,
              createdAt: "2021-06-23T20:11:01.403Z",
              updatedAt: "2021-06-23T20:11:01.406Z",
              name: "Космический",
            },
            {
              ingredients: ["60d3463f7034a000269f45e9"],
              _id: "",
              status: "done",
              number: 3,
              createdAt: "2021-06-23T20:13:23.654Z",
              updatedAt: "2021-06-23T20:13:23.657Z",
              name: "Галактический",
            },
          ],
          total: 2,
          totalToday: 2,
        },
      ],
    });
  });
});
