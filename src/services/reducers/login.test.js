import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_REQUEST_SUCCESS,
} from "../actions/login";
import { loginReducer } from "./login";

describe("loginReducer tests", () => {
  it("should return the initial state", () => {
    expect(loginReducer(undefined, {})).toEqual({
      loginRequest: false,
      loginRequestError: false,
    });
  });

  it("should handle LOGIN_REQUEST", () => {
    expect(
      loginReducer(
        {
          loginRequest: false,
          loginRequestError: false,
        },
        {
          type: LOGIN_REQUEST,
        }
      )
    ).toEqual({
      loginRequest: true,
      loginRequestError: false,
    });
  });
  it("should handle LOGIN_REQUEST_ERROR", () => {
    expect(
      loginReducer(
        {
          loginRequest: true,
          loginRequestError: false,
        },
        {
          type: LOGIN_REQUEST_ERROR,
        }
      )
    ).toEqual({
      loginRequest: false,
      loginRequestError: true,
    });
  });
  it("should handle LOGIN_REQUEST_SUCCESS", () => {
    expect(
      loginReducer(
        {
          loginRequest: true,
          loginRequestError: false,
        },
        {
          type: LOGIN_REQUEST_SUCCESS,
        }
      )
    ).toEqual({
      loginRequest: false,
      loginRequestError: false,
    });
  });
});
