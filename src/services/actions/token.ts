import { AppDispatch, AppThunk } from "../../utils/additionalStorageTyping";
import { EMethod } from "../../utils/consts";
import { doRequest } from "../../utils/doRequest";

export const TOKENS_REQUEST: "TOKENS_REQUEST" = "TOKENS_REQUEST";
export const TOKENS_REQUEST_ERROR: "TOKENS_REQUEST_ERROR" =
  "TOKENS_REQUEST_ERROR";
export const TOKENS_REQUEST_SUCCESS: "TOKENS_REQUEST_SUCCESS" =
  "TOKENS_REQUEST_SUCCESS";
export const SET_REFRESH_TOKEN: "SET_REFRESH_TOKEN" = "SET_REFRESH_TOKEN";
export const REMOVE_REFRESH_TOKEN: "REMOVE_REFRESH_TOKEN" =
  "REMOVE_REFRESH_TOKEN";
export const SET_ACCESS_TOKEN: "SET_ACCESS_TOKEN" = "SET_ACCESS_TOKEN";
export const REMOVE_ACCESS_TOKEN: "REMOVE_ACCESS_TOKEN" = "REMOVE_ACCESS_TOKEN";

export interface ITokenRequestAction {
  readonly type: typeof TOKENS_REQUEST;
}
export interface ITokenRequestErrorAction {
  readonly type: typeof TOKENS_REQUEST_ERROR;
}
export interface ITokenRequestSuccessAction {
  readonly type: typeof TOKENS_REQUEST_SUCCESS;
}
export interface ISetRefreshTokenAction {
  readonly type: typeof SET_REFRESH_TOKEN;
  readonly refreshToken: string;
}
export interface IRemoveRefreshTokenAction {
  readonly type: typeof REMOVE_REFRESH_TOKEN;
}
export interface ISetAccessTokenAction {
  readonly type: typeof SET_ACCESS_TOKEN;
  readonly accessToken: string;
}
export interface IRemoveAccessTokenAction {
  readonly type: typeof REMOVE_ACCESS_TOKEN;
}

export type TTokenActions =
  | ITokenRequestAction
  | ITokenRequestErrorAction
  | ITokenRequestSuccessAction
  | ISetRefreshTokenAction
  | IRemoveRefreshTokenAction
  | ISetAccessTokenAction
  | IRemoveAccessTokenAction;

export const updateTokens: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: TOKENS_REQUEST,
    });

    const option = {
      method: EMethod.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    };

    doRequest("/auth/token", option)
      .then((json) => {
        dispatch({
          type: SET_ACCESS_TOKEN,
          accessToken: json.accessToken.split("Bearer ")[1],
        });
        dispatch({
          type: SET_REFRESH_TOKEN,
          refreshToken: json.refreshToken,
        });
        dispatch({
          type: TOKENS_REQUEST_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: TOKENS_REQUEST_ERROR,
        });
      });
  };
};
