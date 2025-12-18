import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_ERROR,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
} from "../actions/forgot-password";
import { forgotPasswordReducer, initialState } from "./forgot-password";

describe("forgotPasswordReducer tests", () => {
  it("should return the initial state", () => {
    expect(forgotPasswordReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FORGOT_PASSWORD_REQUEST", () => {
    expect(
      forgotPasswordReducer(initialState, {
        type: FORGOT_PASSWORD_REQUEST,
      })
    ).toEqual({
      ...initialState,
      forgotPasswordRequest: true,
    });
  });
  it("should handle FORGOT_PASSWORD_REQUEST_ERROR", () => {
    expect(
      forgotPasswordReducer(
        {
          ...initialState,
          forgotPasswordRequest: true,
        },
        {
          type: FORGOT_PASSWORD_REQUEST_ERROR,
        }
      )
    ).toEqual({
      ...initialState,
      forgotPasswordRequestError: true,
    });
  });
  it("should handle FORGOT_PASSWORD_REQUEST_SUCCESS", () => {
    expect(
      forgotPasswordReducer(
        {
          ...initialState,
          forgotPasswordRequest: true,
        },
        {
          type: FORGOT_PASSWORD_REQUEST_SUCCESS,
        }
      )
    ).toEqual(initialState);
  });
});
