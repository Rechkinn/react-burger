import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_REQUEST_SUCCESS,
  TLoginActions,
} from "../actions/login";

type TLoginState = {
  loginRequest: boolean;
  loginRequestError: boolean;
};

const initialState: TLoginState = {
  loginRequest: false,
  loginRequestError: false,
};

export const loginReducer = (
  state = initialState,
  action: TLoginActions
): TLoginState => {
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
