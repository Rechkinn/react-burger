import { doRequest } from "../../utils/doRequest";
import { SET_ACCESS_TOKEN, SET_REFRESH_TOKEN } from "./token";
import { USER_SET_DATA } from "./user-data";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REQUEST_ERROR = "LOGIN_REQUEST_ERROR";
export const LOGIN_REQUEST_SUCCESS = "LOGIN_REQUEST_SUCCESS";

export const doLogin = (userData) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    doRequest("/auth/login", option)
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
          type: LOGIN_REQUEST_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGIN_REQUEST_ERROR,
        });
      });
  };
};
