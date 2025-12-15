import {
  REGISTER_REQUEST,
  REGISTER_REQUEST_ERROR,
  REGISTER_REQUEST_SUCCESS,
  TRegisterActions,
} from "../actions/register";

type TRegisterState = {
  registerRequest: boolean;
  registerRequestError: boolean;
};

export const initialState: TRegisterState = {
  registerRequest: false,
  registerRequestError: false,
};

export const registerReducer = (
  state = initialState,
  action: TRegisterActions
): TRegisterState => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        registerRequest: true,
        registerRequestError: false,
      };
    case REGISTER_REQUEST_ERROR:
      return {
        ...state,
        registerRequest: false,
        registerRequestError: true,
      };
    case REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        registerRequest: false,
        registerRequestError: false,
      };
    default:
      return state;
  }
};
