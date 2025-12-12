import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_ERROR,
  RESET_PASSWORD_REQUEST_SUCCESS,
} from "../actions/reset-password";
import { resetPasswordReducer } from "./reset-password";

describe("resetPasswordReducer tests", () => {
  it("should return the initial state", () => {
    expect(resetPasswordReducer(undefined, {})).toEqual({
      resetPasswordRequest: false,
      resetPasswordRequestError: false,
    });
  });

  it("should handle RESET_PASSWORD_REQUEST", () => {
    expect(
      resetPasswordReducer(
        {
          resetPasswordRequest: false,
          resetPasswordRequestError: false,
        },
        {
          type: RESET_PASSWORD_REQUEST,
        }
      )
    ).toEqual({
      resetPasswordRequest: true,
      resetPasswordRequestError: false,
    });
  });
  it("should handle RESET_PASSWORD_REQUEST_ERROR", () => {
    expect(
      resetPasswordReducer(
        {
          resetPasswordRequest: true,
          resetPasswordRequestError: false,
        },
        {
          type: RESET_PASSWORD_REQUEST_ERROR,
        }
      )
    ).toEqual({
      resetPasswordRequest: false,
      resetPasswordRequestError: true,
    });
  });
  it("should handle RESET_PASSWORD_REQUEST_SUCCESS", () => {
    expect(
      resetPasswordReducer(
        {
          resetPasswordRequest: true,
          resetPasswordRequestError: false,
        },
        {
          type: RESET_PASSWORD_REQUEST_SUCCESS,
        }
      )
    ).toEqual({
      resetPasswordRequest: false,
      resetPasswordRequestError: false,
    });
  });
});
