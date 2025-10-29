import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_ERROR,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
} from "../actions/forgot-password";

const initialState = {
  forgotPasswordRequest: false,
  forgotPasswordRequestError: false,
};

export const forgotPasswordReducer = (state = initialState, action) => {
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
