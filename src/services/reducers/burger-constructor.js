import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  SET_BUN,
} from "../actions/burger-constructor";

const initialState = {
  burgerConstructor: [],
  bun: null,
};

export const burderConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUN:
      return {
        ...state,
        bun: action.bun,
      };
    case ADD_INGREDIENT_TO_CONSTRUCTOR:
      return {
        ...state,
        burgerConstructor: [...state.burgerConstructor, action.ingredient],
      };
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR:
      return {
        ...state,
        burgerConstructor: [
          ...state.burgerConstructor.filter((ingredient) => {
            if (ingredient._id !== action.id) return ingredient;
          }),
        ],
      };
    default:
      return state;
  }
};
