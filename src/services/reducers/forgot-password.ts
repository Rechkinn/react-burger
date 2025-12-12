import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_ERROR,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  TForgotPasswordActions,
} from "../actions/forgot-password";

type TForgotPasswordState = {
  forgotPasswordRequest: boolean;
  forgotPasswordRequestError: boolean;
};

const initialState: TForgotPasswordState = {
  forgotPasswordRequest: false,
  forgotPasswordRequestError: false,
};

export const forgotPasswordReducer = (
  state = initialState,
  action: TForgotPasswordActions
): TForgotPasswordState => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordRequestError: false,
      };
    case FORGOT_PASSWORD_REQUEST_ERROR:
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestError: true,
      };
    case FORGOT_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestError: false,
      };
    default:
      return state;
  }
};
