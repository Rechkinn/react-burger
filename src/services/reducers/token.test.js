import {
  REMOVE_ACCESS_TOKEN,
  REMOVE_REFRESH_TOKEN,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  TOKENS_REQUEST,
  TOKENS_REQUEST_ERROR,
  TOKENS_REQUEST_SUCCESS,
} from "../actions/token";
import { tokenReducer, initialState } from "./token";

describe("tokenReducer tests", () => {
  it("should return the initial state", () => {
    expect(tokenReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle TOKENS_REQUEST", () => {
    expect(
      tokenReducer(initialState, {
        type: TOKENS_REQUEST,
      })
    ).toEqual({
      ...initialState,
      refreshTokenRequest: true,
    });
  });
  it("should handle TOKENS_REQUEST_ERROR", () => {
    expect(
      tokenReducer(
        {
          ...initialState,
          refreshTokenRequest: true,
        },
        {
          type: TOKENS_REQUEST_ERROR,
        }
      )
    ).toEqual({
      ...initialState,
      refreshTokenRequestError: true,
    });
  });
  it("should handle TOKENS_REQUEST_SUCCESS", () => {
    expect(
      tokenReducer(
        {
          ...initialState,
          refreshTokenRequest: true,
        },
        {
          type: TOKENS_REQUEST_SUCCESS,
        }
      )
    ).toEqual(initialState);
  });
  it("should handle REMOVE_REFRESH_TOKEN", () => {
    expect(
      tokenReducer(initialState, {
        type: REMOVE_REFRESH_TOKEN,
      })
    ).toEqual(initialState);
  });
  it("should handle REMOVE_ACCESS_TOKEN", () => {
    expect(
      tokenReducer(initialState, {
        type: REMOVE_ACCESS_TOKEN,
      })
    ).toEqual(initialState);
  });
  it("should handle SET_REFRESH_TOKEN", () => {
    expect(
      tokenReducer(initialState, {
        type: SET_REFRESH_TOKEN,
      })
    ).toEqual(initialState);
  });
  it("should handle SET_ACCESS_TOKEN", () => {
    expect(
      tokenReducer(initialState, {
        type: SET_ACCESS_TOKEN,
      })
    ).toEqual(initialState);
  });
});
