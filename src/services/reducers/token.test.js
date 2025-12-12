import {
  REMOVE_ACCESS_TOKEN,
  REMOVE_REFRESH_TOKEN,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  TOKENS_REQUEST,
  TOKENS_REQUEST_ERROR,
  TOKENS_REQUEST_SUCCESS,
} from "../actions/token";
import { tokenReducer } from "./token";

describe("tokenReducer tests", () => {
  it("should return the initial state", () => {
    expect(tokenReducer(undefined, {})).toEqual({
      refreshTokenRequest: false,
      refreshTokenRequestError: false,
    });
  });

  it("should handle TOKENS_REQUEST", () => {
    expect(
      tokenReducer(
        {
          refreshTokenRequest: false,
          refreshTokenRequestError: false,
        },
        {
          type: TOKENS_REQUEST,
        }
      )
    ).toEqual({
      refreshTokenRequest: true,
      refreshTokenRequestError: false,
    });
  });
  it("should handle TOKENS_REQUEST_ERROR", () => {
    expect(
      tokenReducer(
        {
          refreshTokenRequest: true,
          refreshTokenRequestError: false,
        },
        {
          type: TOKENS_REQUEST_ERROR,
        }
      )
    ).toEqual({
      refreshTokenRequest: false,
      refreshTokenRequestError: true,
    });
  });
  it("should handle TOKENS_REQUEST_SUCCESS", () => {
    expect(
      tokenReducer(
        {
          refreshTokenRequest: true,
          refreshTokenRequestError: false,
        },
        {
          type: TOKENS_REQUEST_SUCCESS,
        }
      )
    ).toEqual({
      refreshTokenRequest: false,
      refreshTokenRequestError: false,
    });
  });
  it("should handle REMOVE_REFRESH_TOKEN", () => {
    expect(
      tokenReducer(
        {
          refreshTokenRequest: false,
          refreshTokenRequestError: false,
        },
        {
          type: REMOVE_REFRESH_TOKEN,
        }
      )
    ).toEqual({
      refreshTokenRequest: false,
      refreshTokenRequestError: false,
    });
  });
  it("should handle REMOVE_ACCESS_TOKEN", () => {
    expect(
      tokenReducer(
        {
          refreshTokenRequest: false,
          refreshTokenRequestError: false,
        },
        {
          type: REMOVE_ACCESS_TOKEN,
        }
      )
    ).toEqual({
      refreshTokenRequest: false,
      refreshTokenRequestError: false,
    });
  });
  it("should handle SET_REFRESH_TOKEN", () => {
    expect(
      tokenReducer(
        {
          refreshTokenRequest: false,
          refreshTokenRequestError: false,
        },
        {
          type: SET_REFRESH_TOKEN,
        }
      )
    ).toEqual({
      refreshTokenRequest: false,
      refreshTokenRequestError: false,
    });
  });
  it("should handle SET_ACCESS_TOKEN", () => {
    expect(
      tokenReducer(
        {
          refreshTokenRequest: false,
          refreshTokenRequestError: false,
        },
        {
          type: SET_ACCESS_TOKEN,
        }
      )
    ).toEqual({
      refreshTokenRequest: false,
      refreshTokenRequestError: false,
    });
  });
});
