import {
  USER_DATA_REQUEST,
  USER_DATA_REQUEST_ERROR,
  USER_DATA_REQUEST_SUCCESS,
  USER_REMOVE_DATA,
  USER_SET_DATA,
  USER_UPDATE_DATA,
} from "../actions/user-data";
import { userDataReducer, initialState } from "./user-data";

const userData = {
  email: "user@mail.ru",
  name: "Алексей",
  password: "",
};
const newUserData = {
  ...userData,
  name: "Иван",
};

describe("userDataReducer tests", () => {
  it("should return the initial state", () => {
    expect(userDataReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle USER_DATA_REQUEST", () => {
    expect(
      userDataReducer(initialState, {
        type: USER_DATA_REQUEST,
      })
    ).toEqual({
      ...initialState,
      userDataRequest: true,
    });
  });
  it("should handle USER_DATA_REQUEST_ERROR", () => {
    expect(
      userDataReducer(
        {
          ...initialState,
          userDataRequest: true,
        },
        {
          type: USER_DATA_REQUEST_ERROR,
        }
      )
    ).toEqual({
      ...initialState,
      userDataRequestError: true,
    });
  });
  it("should handle USER_DATA_REQUEST_SUCCESS", () => {
    expect(
      userDataReducer(
        {
          ...initialState,
          userDataRequest: true,
        },
        {
          type: USER_DATA_REQUEST_SUCCESS,
        }
      )
    ).toEqual(initialState);
  });
  it("should handle USER_SET_DATA", () => {
    expect(
      userDataReducer(initialState, {
        type: USER_SET_DATA,
        newUserData: userData,
      })
    ).toEqual({
      ...initialState,
      user: userData,
    });
  });
  it("should handle USER_UPDATE_DATA", () => {
    expect(
      userDataReducer(
        {
          ...initialState,
          user: userData,
        },
        {
          type: USER_UPDATE_DATA,
          newUserData: newUserData,
        }
      )
    ).toEqual({
      ...initialState,
      user: newUserData,
    });
  });
  it("should handle USER_REMOVE_DATA", () => {
    expect(
      userDataReducer(
        {
          ...initialState,
          user: userData,
        },
        {
          type: USER_REMOVE_DATA,
        }
      )
    ).toEqual(initialState);
  });
});
