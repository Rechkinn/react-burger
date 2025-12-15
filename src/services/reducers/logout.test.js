import {
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_ERROR,
  LOGOUT_REQUEST_SUCCESS,
} from "../actions/logout";
import { logoutReducer, initialState } from "./logout";

describe("logoutReducer tests", () => {
  it("should return the initial state", () => {
    expect(logoutReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle LOGOUT_REQUEST", () => {
    expect(
      logoutReducer(initialState, {
        type: LOGOUT_REQUEST,
      })
    ).toEqual({
      ...initialState,
      logoutRequest: true,
    });
  });
  it("should handle LOGOUT_REQUEST_ERROR", () => {
    expect(
      logoutReducer(
        {
          ...initialState,
          logoutRequest: true,
        },
        {
          type: LOGOUT_REQUEST_ERROR,
        }
      )
    ).toEqual({
      ...initialState,
      logoutRequestError: true,
    });
  });
  it("should handle LOGOUT_REQUEST_SUCCESS", () => {
    expect(
      logoutReducer(
        {
          ...initialState,
          logoutRequest: true,
        },
        {
          type: LOGOUT_REQUEST_SUCCESS,
        }
      )
    ).toEqual(initialState);
  });
});
