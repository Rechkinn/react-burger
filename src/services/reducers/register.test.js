import {
  REGISTER_REQUEST,
  REGISTER_REQUEST_ERROR,
  REGISTER_REQUEST_SUCCESS,
} from "../actions/register";
import { registerReducer } from "./register";

describe("registerReducer tests", () => {
  it("should return the initial state", () => {
    expect(registerReducer(undefined, {})).toEqual({
      registerRequest: false,
      registerRequestError: false,
    });
  });

  it("should handle REGISTER_REQUEST", () => {
    expect(
      registerReducer(
        {
          registerRequest: false,
          registerRequestError: false,
        },
        {
          type: REGISTER_REQUEST,
        }
      )
    ).toEqual({
      registerRequest: true,
      registerRequestError: false,
    });
  });
  it("should handle REGISTER_REQUEST_ERROR", () => {
    expect(
      registerReducer(
        {
          registerRequest: false,
          registerRequestError: false,
        },
        {
          type: REGISTER_REQUEST_ERROR,
        }
      )
    ).toEqual({
      registerRequest: false,
      registerRequestError: true,
    });
  });
  it("should handle REGISTER_REQUEST_SUCCESS", () => {
    expect(
      registerReducer(
        {
          registerRequest: true,
          registerRequestError: false,
        },
        {
          type: REGISTER_REQUEST_SUCCESS,
        }
      )
    ).toEqual({
      registerRequest: false,
      registerRequestError: false,
    });
  });
});
