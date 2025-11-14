import { EMethod } from "../../utils/consts";
import { getCookie } from "../../utils/cookie";
import { doRequest } from "../../utils/doRequest";

export const USER_DATA_REQUEST = "USER_DATA_REQUEST";
export const USER_DATA_REQUEST_ERROR = "USER_DATA_REQUEST_ERROR";
export const USER_DATA_REQUEST_SUCCESS = "USER_DATA_REQUEST_SUCCESS";
export const USER_SET_DATA = "USER_SET_DATA";
export const USER_UPDATE_DATA = "USER_UPDATE_DATA";
export const USER_REMOVE_DATA = "USER_REMOVE_DATA";

export const getUserData = (): any => {
  return function (dispatch: any) {
    dispatch({
      type: USER_DATA_REQUEST,
    });

    const option = {
      method: EMethod.GET,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    doRequest("/auth/user", option)
      .then((json) => {
        dispatch({
          type: USER_SET_DATA,
          newUserData: json.user,
        });
        dispatch({
          type: USER_DATA_REQUEST_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: USER_DATA_REQUEST_ERROR,
        });
      });
  };
};

export const updateUserData = (userData: any): any => {
  return function (dispatch: any) {
    dispatch({
      type: USER_DATA_REQUEST,
    });

    const option = {
      method: EMethod.PATCH,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify(userData),
    };

    doRequest("/auth/user", option)
      .then((json) => {
        dispatch({
          type: USER_UPDATE_DATA,
          newUserData: json.user,
        });
        dispatch({
          type: USER_DATA_REQUEST_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: USER_DATA_REQUEST_ERROR,
        });
      });
  };
};
