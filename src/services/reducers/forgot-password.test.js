import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_ERROR,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
} from "../actions/forgot-password";
import { forgotPasswordReducer } from "./forgot-password";

describe("forgotPasswordReducer tests", () => {
  it("should return the initial state", () => {
    expect(forgotPasswordReducer(undefined, {})).toEqual({
      forgotPasswordRequest: false,
      forgotPasswordRequestError: false,
    });
  });

  it("should handle FORGOT_PASSWORD_REQUEST", () => {
    expect(
      forgotPasswordReducer(
        {
          forgotPasswordRequest: false,
          forgotPasswordRequestError: false,
        },
        {
          type: FORGOT_PASSWORD_REQUEST,
        }
      )
    ).toEqual({
      forgotPasswordRequest: true,
      forgotPasswordRequestError: false,
    });
  });
  it("should handle FORGOT_PASSWORD_REQUEST_ERROR", () => {
    expect(
      forgotPasswordReducer(
        {
          forgotPasswordRequest: true,
          forgotPasswordRequestError: false,
        },
        {
          type: FORGOT_PASSWORD_REQUEST_ERROR,
        }
      )
    ).toEqual({
      forgotPasswordRequest: false,
      forgotPasswordRequestError: true,
    });
  });
  it("should handle FORGOT_PASSWORD_REQUEST_SUCCESS", () => {
    expect(
      forgotPasswordReducer(
        {
          forgotPasswordRequest: true,
          forgotPasswordRequestError: false,
        },
        {
          type: FORGOT_PASSWORD_REQUEST_SUCCESS,
        }
      )
    ).toEqual({
      forgotPasswordRequest: false,
      forgotPasswordRequestError: false,
    });
  });
});
