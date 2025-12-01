import { AppDispatch, AppThunk } from "../../utils/additionalStorageTyping";
import { EMethod } from "../../utils/consts";
import { doRequest } from "../../utils/doRequest";

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" =
  "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_REQUEST_ERROR: "FORGOT_PASSWORD_REQUEST_ERROR" =
  "FORGOT_PASSWORD_REQUEST_ERROR";
export const FORGOT_PASSWORD_REQUEST_SUCCESS: "FORGOT_PASSWORD_REQUEST_SUCCESS" =
  "FORGOT_PASSWORD_REQUEST_SUCCESS";

export interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotPasswordRequestErrorAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST_ERROR;
}
export interface IForgotPasswordRequestSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST_SUCCESS;
}

export type TForgotPasswordActions =
  | IForgotPasswordRequestAction
  | IForgotPasswordRequestErrorAction
  | IForgotPasswordRequestSuccessAction;

export const doForgotPassword: AppThunk = (userData) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });

    const option = {
      method: EMethod.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    doRequest("/password-reset", option)
      .then(() => {
        dispatch({
          type: FORGOT_PASSWORD_REQUEST_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: FORGOT_PASSWORD_REQUEST_ERROR,
        });
      });
  };
};
