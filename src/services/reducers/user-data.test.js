import {
  USER_DATA_REQUEST,
  USER_DATA_REQUEST_ERROR,
  USER_DATA_REQUEST_SUCCESS,
  USER_REMOVE_DATA,
  USER_SET_DATA,
  USER_UPDATE_DATA,
} from "../actions/user-data";
import { userDataReducer } from "./user-data";

describe("userDataReducer tests", () => {
  it("should return the initial state", () => {
    expect(userDataReducer(undefined, {})).toEqual({
      user: null,
      userDataRequest: false,
      userDataRequestError: false,
    });
  });

  it("should handle USER_DATA_REQUEST", () => {
    expect(
      userDataReducer(
        {
          user: null,
          userDataRequest: false,
          userDataRequestError: false,
        },
        {
          type: USER_DATA_REQUEST,
        }
      )
    ).toEqual({
      user: null,
      userDataRequest: true,
      userDataRequestError: false,
    });
  });
  it("should handle USER_DATA_REQUEST_ERROR", () => {
    expect(
      userDataReducer(
        {
          user: null,
          userDataRequest: true,
          userDataRequestError: false,
        },
        {
          type: USER_DATA_REQUEST_ERROR,
        }
      )
    ).toEqual({
      user: null,
      userDataRequest: false,
      userDataRequestError: true,
    });
  });
  it("should handle USER_DATA_REQUEST_SUCCESS", () => {
    expect(
      userDataReducer(
        {
          user: null,
          userDataRequest: true,
          userDataRequestError: false,
        },
        {
          type: USER_DATA_REQUEST_SUCCESS,
        }
      )
    ).toEqual({
      user: null,
      userDataRequest: false,
      userDataRequestError: false,
    });
  });
  it("should handle USER_SET_DATA", () => {
    expect(
      userDataReducer(
        {
          user: null,
          userDataRequest: false,
          userDataRequestError: false,
        },
        {
          type: USER_SET_DATA,
          newUserData: {
            email: "user@mail.ru",
            name: "Алексей",
            password: "",
          },
        }
      )
    ).toEqual({
      user: {
        email: "user@mail.ru",
        name: "Алексей",
        password: "",
      },
      userDataRequest: false,
      userDataRequestError: false,
    });
  });
  it("should handle USER_UPDATE_DATA", () => {
    expect(
      userDataReducer(
        {
          user: {
            email: "user@mail.ru",
            name: "Алексей",
            password: "",
          },
          userDataRequest: false,
          userDataRequestError: false,
        },
        {
          type: USER_UPDATE_DATA,
          newUserData: {
            email: "user@mail.ru",
            name: "Иван",
            password: "",
          },
        }
      )
    ).toEqual({
      user: {
        email: "user@mail.ru",
        name: "Иван",
        password: "",
      },
      userDataRequest: false,
      userDataRequestError: false,
    });
  });
  it("should handle USER_REMOVE_DATA", () => {
    expect(
      userDataReducer(
        {
          user: {
            email: "user@mail.ru",
            name: "Алексей",
            password: "",
          },
          userDataRequest: false,
          userDataRequestError: false,
        },
        {
          type: USER_REMOVE_DATA,
        }
      )
    ).toEqual({
      user: null,
      userDataRequest: false,
      userDataRequestError: false,
    });
  });
});
