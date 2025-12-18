import {
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_ERROR,
  LOGOUT_REQUEST_SUCCESS,
  TLogoutActions,
} from "../actions/logout";

type TLogoutState = {
  logoutRequest: boolean;
  logoutRequestError: boolean;
};

export const initialState: TLogoutState = {
  logoutRequest: false,
  logoutRequestError: false,
};

export const logoutReducer = (
  state = initialState,
  action: TLogoutActions
): TLogoutState => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {
        ...state,
        logoutRequest: true,
        logoutRequestError: false,
      };

    case LOGOUT_REQUEST_ERROR:
      return {
        ...state,
        logoutRequest: false,
        logoutRequestError: true,
      };

    case LOGOUT_REQUEST_SUCCESS:
      return {
        ...state,
        logoutRequest: false,
        logoutRequestError: false,
      };

    default:
      return state;
  }
};
