import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_ERROR,
  RESET_PASSWORD_REQUEST_SUCCESS,
  TResetPasswordActions,
} from "../actions/reset-password";

type TResetPasswordState = {
  resetPasswordRequest: boolean;
  resetPasswordRequestError: boolean;
};

export const initialState: TResetPasswordState = {
  resetPasswordRequest: false,
  resetPasswordRequestError: false,
};

export const resetPasswordReducer = (
  state = initialState,
  action: TResetPasswordActions
): TResetPasswordState => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordRequestError: false,
      };

    case RESET_PASSWORD_REQUEST_ERROR:
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestError: true,
      };

    case RESET_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestError: false,
      };

    default:
      return state;
  }
};
