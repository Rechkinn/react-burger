import { AppDispatch, AppThunk } from "../../utils/additionalStorageTyping";
import { EMethod } from "../../utils/consts";
import { getCookie } from "../../utils/cookie";
import { doRequest } from "../../utils/doRequest";
import { TUserData } from "../../utils/types";

export const USER_DATA_REQUEST: "USER_DATA_REQUEST" = "USER_DATA_REQUEST";
export const USER_DATA_REQUEST_ERROR: "USER_DATA_REQUEST_ERROR" =
  "USER_DATA_REQUEST_ERROR";
export const USER_DATA_REQUEST_SUCCESS: "USER_DATA_REQUEST_SUCCESS" =
  "USER_DATA_REQUEST_SUCCESS";
export const USER_SET_DATA: "USER_SET_DATA" = "USER_SET_DATA";
export const USER_UPDATE_DATA: "USER_UPDATE_DATA" = "USER_UPDATE_DATA";
export const USER_REMOVE_DATA: "USER_REMOVE_DATA" = "USER_REMOVE_DATA";

export interface IUserDataRequestAction {
  readonly type: typeof USER_DATA_REQUEST;
}
export interface IUserDataRequestErrorAction {
  readonly type: typeof USER_DATA_REQUEST_ERROR;
}
export interface IUserDataRequestSuccessAction {
  readonly type: typeof USER_DATA_REQUEST_SUCCESS;
}
export interface IUserSetDataAction {
  readonly type: typeof USER_SET_DATA;
  readonly newUserData: TUserData;
}
export interface IUserUpdateDataAction {
  readonly type: typeof USER_UPDATE_DATA;
  readonly newUserData: TUserData;
}
export interface IUserRemoveDataAction {
  readonly type: typeof USER_REMOVE_DATA;
}

export type TUserDataActions =
  | IUserDataRequestAction
  | IUserDataRequestErrorAction
  | IUserDataRequestSuccessAction
  | IUserSetDataAction
  | IUserUpdateDataAction
  | IUserRemoveDataAction;

export const getUserData: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: USER_DATA_REQUEST,
    });

    const option = {
      method: EMethod.GET,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    doRequest("/auth/user", option)
      .then((json) => {
        dispatch({
          type: USER_SET_DATA,
          newUserData: json.user,
        });
        dispatch({
          type: USER_DATA_REQUEST_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: USER_DATA_REQUEST_ERROR,
        });
      });
  };
};

export const updateUserData: AppThunk = (userData) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: USER_DATA_REQUEST,
    });

    const option = {
      method: EMethod.PATCH,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify(userData),
    };

    doRequest("/auth/user", option)
      .then((json) => {
        dispatch({
          type: USER_UPDATE_DATA,
          newUserData: json.user,
        });
        dispatch({
          type: USER_DATA_REQUEST_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: USER_DATA_REQUEST_ERROR,
        });
      });
  };
};
