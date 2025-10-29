import { getCookie } from "../../utils/cookie";
import { doRequest } from "../../utils/doRequest";

export const USER_DATA_REQUEST = "USER_DATA_REQUEST";
export const USER_DATA_REQUEST_ERROR = "USER_DATA_REQUEST_ERROR";
export const USER_DATA_REQUEST_SUCCESS = "USER_DATA_REQUEST_SUCCESS";
export const USER_SET_DATA = "USER_SET_DATA";
export const USER_UPDATE_DATA = "USER_UPDATE_DATA";
export const USER_REMOVE_DATA = "USER_REMOVE_DATA";

export const getUserData = () => {
  return function (dispatch) {
    dispatch({
      type: USER_DATA_REQUEST,
    });

    const option = {
      method: "GET",
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

export const updateUserData = (userData) => {
  return function (dispatch) {
    dispatch({
      type: USER_DATA_REQUEST,
    });

    const option = {
      method: "PATCH",
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
