import { doRequest } from "../../utils/doRequest";

export const TOKENS_REQUEST = "TOKENS_REQUEST";
export const TOKENS_REQUEST_ERROR = "TOKENS_REQUEST_ERROR";
export const TOKENS_REQUEST_SUCCESS = "TOKENS_REQUEST_SUCCESS";
export const SET_REFRESH_TOKEN = "SET_REFRESH_TOKEN";
export const REMOVE_REFRESH_TOKEN = "REMOVE_REFRESH_TOKEN";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const REMOVE_ACCESS_TOKEN = "REMOVE_ACCESS_TOKEN";

export const updateTokens = () => {
  return function (dispatch) {
    dispatch({
      type: TOKENS_REQUEST,
    });

    const option = {
      method: "POST",
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
