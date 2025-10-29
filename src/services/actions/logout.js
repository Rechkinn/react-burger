import { doRequest } from "../../utils/doRequest";
import { REMOVE_ACCESS_TOKEN, REMOVE_REFRESH_TOKEN } from "./token";
import { USER_REMOVE_DATA } from "./user-data";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_REQUEST_ERROR = "LOGOUT_REQUEST_ERROR";
export const LOGOUT_REQUEST_SUCCESS = "LOGOUT_REQUEST_SUCCESS";

export const doLogout = () => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });

    const option = {
      method: "POST",
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
