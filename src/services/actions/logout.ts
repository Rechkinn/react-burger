import { AppDispatch, AppThunk } from "../../utils/additionalStorageTyping";
import { EMethod } from "../../utils/consts";
import { doRequest } from "../../utils/doRequest";
import { REMOVE_ACCESS_TOKEN, REMOVE_REFRESH_TOKEN } from "./token";
import { USER_REMOVE_DATA } from "./user-data";

export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_REQUEST_ERROR: "LOGOUT_REQUEST_ERROR" =
  "LOGOUT_REQUEST_ERROR";
export const LOGOUT_REQUEST_SUCCESS: "LOGOUT_REQUEST_SUCCESS" =
  "LOGOUT_REQUEST_SUCCESS";

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutRequestErrorAction {
  readonly type: typeof LOGOUT_REQUEST_ERROR;
}
export interface ILogoutRequestSuccessAction {
  readonly type: typeof LOGOUT_REQUEST_SUCCESS;
}

export type TLogoutActions =
  | ILogoutRequestAction
  | ILogoutRequestErrorAction
  | ILogoutRequestSuccessAction;

export const doLogout: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });

    const option = {
      method: EMethod.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    };

    doRequest("/auth/logout", option)
      .then((json) => {
        dispatch({
          type: REMOVE_ACCESS_TOKEN,
        });
        dispatch({
          type: REMOVE_REFRESH_TOKEN,
        });
        dispatch({
          type: USER_REMOVE_DATA,
        });
        dispatch({
          type: LOGOUT_REQUEST_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_REQUEST_ERROR,
        });
      });
  };
};
