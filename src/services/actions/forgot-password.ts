import { EMethod } from "../../utils/consts";
import { doRequest } from "../../utils/doRequest";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_REQUEST_ERROR = "FORGOT_PASSWORD_REQUEST_ERROR";
export const FORGOT_PASSWORD_REQUEST_SUCCESS =
  "FORGOT_PASSWORD_REQUEST_SUCCESS";

export const doForgotPassword = (userData: any): any => {
  return function (dispatch: any) {
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
