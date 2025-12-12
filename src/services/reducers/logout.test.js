import {
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_ERROR,
  LOGOUT_REQUEST_SUCCESS,
} from "../actions/logout";
import { logoutReducer } from "./logout";

describe("logoutReducer tests", () => {
  it("should return the initial state", () => {
    expect(logoutReducer(undefined, {})).toEqual({
      logoutRequest: false,
      logoutRequestError: false,
    });
  });

  it("should handle LOGOUT_REQUEST", () => {
    expect(
      logoutReducer(
        {
          logoutRequest: false,
          logoutRequestError: false,
        },
        {
          type: LOGOUT_REQUEST,
        }
      )
    ).toEqual({
      logoutRequest: true,
      logoutRequestError: false,
    });
  });
  it("should handle LOGOUT_REQUEST_ERROR", () => {
    expect(
      logoutReducer(
        {
          logoutRequest: true,
          logoutRequestError: false,
        },
        {
          type: LOGOUT_REQUEST_ERROR,
        }
      )
    ).toEqual({
      logoutRequest: false,
      logoutRequestError: true,
    });
  });
  it("should handle LOGOUT_REQUEST_SUCCESS", () => {
    expect(
      logoutReducer(
        {
          logoutRequest: true,
          logoutRequestError: false,
        },
        {
          type: LOGOUT_REQUEST_SUCCESS,
        }
      )
    ).toEqual({
      logoutRequest: false,
      logoutRequestError: false,
    });
  });
});
