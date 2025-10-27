import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_REQUEST_SUCCESS,
} from "../actions/login";

const initialState = {
  loginRequest: false,
  loginRequestError: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loginRequest: true,
        loginRequestError: false,
      };
    case LOGIN_REQUEST_ERROR:
      return {
        ...state,
        loginRequest: false,
        loginRequestError: true,
      };
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loginRequest: false,
        loginRequestError: false,
      };
    default:
      return state;
  }
};
