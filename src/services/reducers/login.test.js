import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_REQUEST_SUCCESS,
} from "../actions/login";
import { loginReducer, initialState } from "./login";

describe("loginReducer tests", () => {
  it("should return the initial state", () => {
    expect(loginReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle LOGIN_REQUEST", () => {
    expect(
      loginReducer(initialState, {
        type: LOGIN_REQUEST,
      })
    ).toEqual({
      ...initialState,
      loginRequest: true,
    });
  });
  it("should handle LOGIN_REQUEST_ERROR", () => {
    expect(
      loginReducer(
        {
          ...initialState,
          loginRequest: true,
        },
        {
          type: LOGIN_REQUEST_ERROR,
        }
      )
    ).toEqual({
      ...initialState,
      loginRequestError: true,
    });
  });
  it("should handle LOGIN_REQUEST_SUCCESS", () => {
    expect(
      loginReducer(
        {
          ...initialState,
          loginRequest: true,
        },
        {
          type: LOGIN_REQUEST_SUCCESS,
        }
      )
    ).toEqual(initialState);
  });
});
