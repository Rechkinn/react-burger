import { burderConstructorReducer, initialState } from "./burger-constructor";
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  SET_BUN,
  CHANGE_SUBSEQUENCE_BURGER_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
} from "../actions/burger-constructor";

const burderConstructorIngredient = {
  ingredient: {
    _id: "1",
    name: "Котлета",
    type: "main",
    proteins: 122,
    fat: 71,
    carbohydrates: 55,
    calories: 90,
    price: 2500,
    image: "url",
    image_mobile: "url",
    image_large: "url",
    __v: 1,
  },
  uniqueId: "123-uuid",
};
const burderConstructorIngredient2 = {
  ingredient: {
    _id: "2",
    name: "Кольца луковые",
    type: "main",
    proteins: 12,
    fat: 44,
    carbohydrates: 22,
    calories: 11,
    price: 500,
    image: "url",
    image_mobile: "url",
    image_large: "url",
    __v: 2,
  },
  uniqueId: "456-uu-324-id",
};
const bun = {
  ingredient: {
    _id: "1",
    name: "Булка",
    type: "bun",
    proteins: 2,
    fat: 32,
    carbohydrates: 44,
    calories: 21,
    price: 1500,
    image: "url",
    image_mobile: "url",
    image_large: "url",
    __v: 1,
  },
};

const actionAdd = {
  type: ADD_INGREDIENT_TO_CONSTRUCTOR,
  payload: burderConstructorIngredient,
};
const actionRemove = {
  type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  uuid: "123-uuid",
};

const actionSetBun = {
  type: SET_BUN,
  bun: bun,
};

const burgerConstructorWithTwoIngredients = [
  burderConstructorIngredient2,
  burderConstructorIngredient,
];
const burgerConstructorWithFirstIngredient = [burderConstructorIngredient];
const burgerConstructorWithSecondIngredient = [burderConstructorIngredient2];

describe("burderConstructorReducer tests", () => {
  it("should return the initial state", () => {
    expect(burderConstructorReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD_INGREDIENT_TO_CONSTRUCTOR", () => {
    expect(burderConstructorReducer(initialState, actionAdd)).toEqual({
      ...initialState,
      burgerConstructor: burgerConstructorWithFirstIngredient,
    });

    expect(
      burderConstructorReducer(
        {
          ...initialState,
          burgerConstructor: burgerConstructorWithSecondIngredient,
        },
        actionAdd
      )
    ).toEqual({
      ...initialState,
      burgerConstructor: burgerConstructorWithTwoIngredients,
    });
  });

  it("should handle REMOVE_INGREDIENT_FROM_CONSTRUCTOR", () => {
    expect(
      burderConstructorReducer(
        {
          ...initialState,
          burgerConstructor: burgerConstructorWithFirstIngredient,
        },
        actionRemove
      )
    ).toEqual(initialState);

    expect(
      burderConstructorReducer(
        {
          ...initialState,
          burgerConstructor: burgerConstructorWithTwoIngredients,
        },
        actionRemove
      )
    ).toEqual({
      ...initialState,
      burgerConstructor: burgerConstructorWithSecondIngredient,
    });
  });

  it("should handle SET_BUN", () => {
    expect(burderConstructorReducer(initialState, actionSetBun)).toEqual({
      ...initialState,
      bun: bun,
    });

    expect(
      burderConstructorReducer(
        {
          ...initialState,
          bun: {
            ingredient: {
              _id: "2",
              name: "Булка",
              type: "bun",
              proteins: 2,
              fat: 32,
              carbohydrates: 44,
              calories: 21,
              price: 1500,
              image: "url",
              image_mobile: "url",
              image_large: "url",
              __v: 2,
            },
          },
        },
        actionSetBun
      )
    ).toEqual({
      ...initialState,
      bun: bun,
    });
  });

  it("should handle CHANGE_SUBSEQUENCE_BURGER_CONSTRUCTOR", () => {
    expect(
      burderConstructorReducer(
        {
          ...initialState,
          burgerConstructor: [
            {
              ...burderConstructorIngredient2,
              uniqueId: "123-uuid",
            },
            {
              ...burderConstructorIngredient2,
              uniqueId: "12-23-3-uuid",
            },
            {
              ...burderConstructorIngredient2,
              uniqueId: "12-qwe-3-uuid",
            },
            {
              ...burderConstructorIngredient,
              uniqueId: "12-123-qwe-3-uuid",
            },
          ],
        },
        {
          type: CHANGE_SUBSEQUENCE_BURGER_CONSTRUCTOR,
          positionDropTargetElement: 0,
          positionDragElement: { positionList: 3 },
        }
      )
    ).toEqual({
      ...initialState,
      burgerConstructor: [
        {
          ...burderConstructorIngredient,
          uniqueId: "12-123-qwe-3-uuid",
        },
        {
          ...burderConstructorIngredient2,
          uniqueId: "123-uuid",
        },
        {
          ...burderConstructorIngredient2,
          uniqueId: "12-23-3-uuid",
        },
        {
          ...burderConstructorIngredient2,
          uniqueId: "12-qwe-3-uuid",
        },
      ],
    });
  });

  it("should handle CLEAR_CONSTRUCTOR", () => {
    expect(
      burderConstructorReducer(
        {
          burgerConstructor: burgerConstructorWithTwoIngredients,
          bun: bun,
        },
        {
          type: CLEAR_CONSTRUCTOR,
        }
      )
    ).toEqual(initialState);
  });
});
