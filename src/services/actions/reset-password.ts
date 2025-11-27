import { EMethod } from "../../utils/consts";
import { doRequest } from "../../utils/doRequest";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_REQUEST_ERROR = "RESET_PASSWORD_REQUEST_ERROR";
export const RESET_PASSWORD_REQUEST_SUCCESS = "RESET_PASSWORD_REQUEST_SUCCESS";

export const doResetPassword = (userData: any): any => {
  return function (dispatch: any) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    const option = {
      method: EMethod.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    doRequest("/password-reset/reset", option)
      .then(() => {
        dispatch({
          type: RESET_PASSWORD_REQUEST_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: RESET_PASSWORD_REQUEST_ERROR,
        });
      });
  };
};
