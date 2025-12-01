import { AppDispatch, AppThunk } from "../../utils/additionalStorageTyping";
import { EMethod } from "../../utils/consts";
import { doRequest } from "../../utils/doRequest";
import { SET_ACCESS_TOKEN, SET_REFRESH_TOKEN } from "./token";
import { USER_SET_DATA } from "./user-data";

export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_REQUEST_SUCCESS: "REGISTER_REQUEST_SUCCESS" =
  "REGISTER_REQUEST_SUCCESS";
export const REGISTER_REQUEST_ERROR: "REGISTER_REQUEST_ERROR" =
  "REGISTER_REQUEST_ERROR";

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterRequestErrorAction {
  readonly type: typeof REGISTER_REQUEST_ERROR;
}
export interface IRegisterRequestSuccessAction {
  readonly type: typeof REGISTER_REQUEST_SUCCESS;
}

export type TRegisterActions =
  | IRegisterRequestAction
  | IRegisterRequestErrorAction
  | IRegisterRequestSuccessAction;

export const createNewUser: AppThunk = (userData) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });

    const option = {
      method: EMethod.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    doRequest("/auth/register", option)
      .then((json) => {
        dispatch({
          type: USER_SET_DATA,
          newUserData: json.user,
        });
        dispatch({
          type: SET_ACCESS_TOKEN,
          accessToken: json.accessToken.split("Bearer ")[1],
        });
        dispatch({
          type: SET_REFRESH_TOKEN,
          refreshToken: json.refreshToken,
        });
        dispatch({
          type: REGISTER_REQUEST_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: REGISTER_REQUEST_ERROR,
        });
      });
  };
};
