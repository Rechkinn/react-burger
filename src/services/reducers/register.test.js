import {
  REGISTER_REQUEST,
  REGISTER_REQUEST_ERROR,
  REGISTER_REQUEST_SUCCESS,
} from "../actions/register";
import { registerReducer, initialState } from "./register";

describe("registerReducer tests", () => {
  it("should return the initial state", () => {
    expect(registerReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle REGISTER_REQUEST", () => {
    expect(
      registerReducer(initialState, {
        type: REGISTER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      registerRequest: true,
    });
  });
  it("should handle REGISTER_REQUEST_ERROR", () => {
    expect(
      registerReducer(
        {
          ...initialState,
          registerRequest: true,
        },
        {
          type: REGISTER_REQUEST_ERROR,
        }
      )
    ).toEqual({
      ...initialState,
      registerRequestError: true,
    });
  });
  it("should handle REGISTER_REQUEST_SUCCESS", () => {
    expect(
      registerReducer(
        {
          ...initialState,
          registerRequest: true,
        },
        {
          type: REGISTER_REQUEST_SUCCESS,
        }
      )
    ).toEqual(initialState);
  });
});
