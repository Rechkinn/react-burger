import { burderConstructorReducer } from "./burger-constructor";
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  SET_BUN,
  CHANGE_SUBSEQUENCE_BURGER_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
} from "../actions/burger-constructor";

describe("burderConstructorReducer tests", () => {
  it("should return the initial state", () => {
    expect(burderConstructorReducer(undefined, {})).toEqual({
      burgerConstructor: [],
      bun: null,
    });
  });

  it("should handle ADD_INGREDIENT_TO_CONSTRUCTOR", () => {
    expect(
      burderConstructorReducer(
        {
          burgerConstructor: [],
          bun: null,
        },
        {
          type: ADD_INGREDIENT_TO_CONSTRUCTOR,
          payload: {
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
          },
        }
      )
    ).toEqual({
      burgerConstructor: [
        {
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
        },
      ],
      bun: null,
    });

    expect(
      burderConstructorReducer(
        {
          burgerConstructor: [
            {
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
            },
          ],
          bun: null,
        },
        {
          type: ADD_INGREDIENT_TO_CONSTRUCTOR,
          payload: {
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
          },
        }
      )
    ).toEqual({
      burgerConstructor: [
        {
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
        },
        {
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
        },
      ],
      bun: null,
    });
  });

  it("should handle REMOVE_INGREDIENT_FROM_CONSTRUCTOR", () => {
    expect(
      burderConstructorReducer(
        {
          burgerConstructor: [
            {
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
            },
          ],
          bun: null,
        },
        {
          type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
          uuid: "123-uuid",
        }
      )
    ).toEqual({
      burgerConstructor: [],
      bun: null,
    });

    expect(
      burderConstructorReducer(
        {
          burgerConstructor: [
            {
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
            },
            {
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
            },
          ],
          bun: null,
        },
        {
          type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
          uuid: "123-uuid",
        }
      )
    ).toEqual({
      burgerConstructor: [
        {
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
        },
      ],
      bun: null,
    });
  });

  it("should handle SET_BUN", () => {
    expect(
      burderConstructorReducer(
        {
          burgerConstructor: [],
          bun: null,
        },
        {
          type: SET_BUN,
          bun: {
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
          },
        }
      )
    ).toEqual({
      burgerConstructor: [],
      bun: {
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
      },
    });

    expect(
      burderConstructorReducer(
        {
          burgerConstructor: [],
          bun: {
            ingredient: {
              _id: "2",
              name: "Булка прокаченная",
              type: "bun",
              proteins: 2,
              fat: 32,
              carbohydrates: 44,
              calories: 21,
              price: 1200,
              image: "url",
              image_mobile: "url",
              image_large: "url",
              __v: 2,
            },
          },
        },
        {
          type: SET_BUN,
          bun: {
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
          },
        }
      )
    ).toEqual({
      burgerConstructor: [],
      bun: {
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
      },
    });
  });

  it("should handle CHANGE_SUBSEQUENCE_BURGER_CONSTRUCTOR", () => {
    expect(
      burderConstructorReducer(
        {
          burgerConstructor: [
            {
              ingredient: {
                _id: "1",
                name: "Котлета 1",
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
            },
            {
              ingredient: {
                _id: "2",
                name: "Котлета 2",
                type: "main",
                proteins: 12,
                fat: 71,
                carbohydrates: 55,
                calories: 90,
                price: 2210,
                image: "url",
                image_mobile: "url",
                image_large: "url",
                __v: 2,
              },
              uniqueId: "12-23-3-uuid",
            },
            {
              ingredient: {
                _id: "3",
                name: "Котлета 3",
                type: "main",
                proteins: 12,
                fat: 71,
                carbohydrates: 55,
                calories: 90,
                price: 1210,
                image: "url",
                image_mobile: "url",
                image_large: "url",
                __v: 3,
              },
              uniqueId: "12-qwe-3-uuid",
            },
            {
              ingredient: {
                _id: "4",
                name: "Котлета 4",
                type: "main",
                proteins: 12,
                fat: 71,
                carbohydrates: 55,
                calories: 90,
                price: 4210,
                image: "url",
                image_mobile: "url",
                image_large: "url",
                __v: 4,
              },
              uniqueId: "12-123-qwe-3-uuid",
            },
          ],
          bun: null,
        },
        {
          type: CHANGE_SUBSEQUENCE_BURGER_CONSTRUCTOR,
          positionDropTargetElement: 0,
          positionDragElement: { positionList: 3 },
        }
      )
    ).toEqual({
      burgerConstructor: [
        {
          ingredient: {
            _id: "4",
            name: "Котлета 4",
            type: "main",
            proteins: 12,
            fat: 71,
            carbohydrates: 55,
            calories: 90,
            price: 4210,
            image: "url",
            image_mobile: "url",
            image_large: "url",
            __v: 4,
          },
          uniqueId: "12-123-qwe-3-uuid",
        },
        {
          ingredient: {
            _id: "1",
            name: "Котлета 1",
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
        },
        {
          ingredient: {
            _id: "2",
            name: "Котлета 2",
            type: "main",
            proteins: 12,
            fat: 71,
            carbohydrates: 55,
            calories: 90,
            price: 2210,
            image: "url",
            image_mobile: "url",
            image_large: "url",
            __v: 2,
          },
          uniqueId: "12-23-3-uuid",
        },
        {
          ingredient: {
            _id: "3",
            name: "Котлета 3",
            type: "main",
            proteins: 12,
            fat: 71,
            carbohydrates: 55,
            calories: 90,
            price: 1210,
            image: "url",
            image_mobile: "url",
            image_large: "url",
            __v: 3,
          },
          uniqueId: "12-qwe-3-uuid",
        },
      ],
      bun: null,
    });
  });

  it("should handle CLEAR_CONSTRUCTOR", () => {
    expect(
      burderConstructorReducer(
        {
          burgerConstructor: [
            {
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
            },
            {
              ingredient: {
                _id: "2",
                name: "Острый соус",
                type: "main",
                proteins: 12,
                fat: 11,
                carbohydrates: 54,
                calories: 20,
                price: 1500,
                image: "url",
                image_mobile: "url",
                image_large: "url",
                __v: 2,
              },
              uniqueId: "1123-432-dsf-23-uuid",
            },
          ],
          bun: {
            ingredient: {
              _id: "2",
              name: "Булка прокаченная",
              type: "bun",
              proteins: 2,
              fat: 32,
              carbohydrates: 44,
              calories: 21,
              price: 1200,
              image: "url",
              image_mobile: "url",
              image_large: "url",
              __v: 2,
            },
          },
        },
        {
          type: CLEAR_CONSTRUCTOR,
        }
      )
    ).toEqual({
      burgerConstructor: [],
      bun: null,
    });
  });
});
