import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_ERROR,
  RESET_PASSWORD_REQUEST_SUCCESS,
} from "../actions/reset-password";
import { resetPasswordReducer, initialState } from "./reset-password";

describe("resetPasswordReducer tests", () => {
  it("should return the initial state", () => {
    expect(resetPasswordReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle RESET_PASSWORD_REQUEST", () => {
    expect(
      resetPasswordReducer(initialState, {
        type: RESET_PASSWORD_REQUEST,
      })
    ).toEqual({
      ...initialState,
      resetPasswordRequest: true,
    });
  });
  it("should handle RESET_PASSWORD_REQUEST_ERROR", () => {
    expect(
      resetPasswordReducer(
        {
          ...initialState,
          resetPasswordRequest: true,
        },
        {
          type: RESET_PASSWORD_REQUEST_ERROR,
        }
      )
    ).toEqual({
      ...initialState,
      resetPasswordRequestError: true,
    });
  });
  it("should handle RESET_PASSWORD_REQUEST_SUCCESS", () => {
    expect(
      resetPasswordReducer(
        {
          ...initialState,
          resetPasswordRequest: true,
        },
        {
          type: RESET_PASSWORD_REQUEST_SUCCESS,
        }
      )
    ).toEqual(initialState);
  });
});
