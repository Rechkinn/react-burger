import { deleteCookie, setCookie } from "../../utils/cookie";
import {
  REMOVE_ACCESS_TOKEN,
  REMOVE_REFRESH_TOKEN,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  TOKENS_REQUEST,
  TOKENS_REQUEST_ERROR,
  TOKENS_REQUEST_SUCCESS,
} from "../actions/token";

const initialState = {
  refreshTokenRequest: false,
  refreshTokenRequestError: false,
};

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      setCookie("token", action.accessToken, 1200);
      return state;
    case REMOVE_ACCESS_TOKEN:
      deleteCookie("token");
      return state;
    case SET_REFRESH_TOKEN:
      localStorage.setItem("refreshToken", action.refreshToken);
      return state;
    case REMOVE_REFRESH_TOKEN:
      localStorage.removeItem("refreshToken");
      return state;
    case TOKENS_REQUEST:
      return {
        ...state,
        refreshTokenRequest: true,
        refreshTokenRequestError: false,
      };
    case TOKENS_REQUEST_ERROR:
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenRequestError: true,
      };
    case TOKENS_REQUEST_SUCCESS:
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenRequestError: false,
      };
    default:
      return state;
  }
};
