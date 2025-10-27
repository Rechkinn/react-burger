import {
  USER_DATA_REQUEST,
  USER_DATA_REQUEST_ERROR,
  USER_DATA_REQUEST_SUCCESS,
  USER_REMOVE_DATA,
  USER_SET_DATA,
  USER_UPDATE_DATA,
} from "../actions/user-data";

const initialState = {
  user: null,
  userDataRequest: false,
  userDataRequestError: false,
};

export const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SET_DATA:
      return {
        ...state,
        user: action.newUserData,
      };
    case USER_UPDATE_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.newUserData,
        },
      };
    case USER_REMOVE_DATA:
      return {
        ...state,
        user: null,
      };
    case USER_DATA_REQUEST:
      return {
        ...state,
        userDataRequest: true,
        userDataRequestError: false,
      };
    case USER_DATA_REQUEST_ERROR:
      return {
        ...state,
        userDataRequest: false,
        userDataRequestError: true,
      };
    case USER_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        userDataRequest: false,
        userDataRequestError: false,
      };
    default:
      return state;
  }
};
