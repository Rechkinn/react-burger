import {
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_ERROR,
  LOGOUT_REQUEST_SUCCESS,
} from "../actions/logout";

const initialState = {
  logoutRequest: false,
  logoutRequestError: false,
};

export const logoutReducer = (state = initialState, action) => {
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
