import { TIngredient, TIngredientWithUniqueId } from "../../utils/types";
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  SET_BUN,
  CHANGE_SUBSEQUENCE_BURGER_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
  TBurgerConstructorActions,
} from "../actions/burger-constructor";

type TBurgerConstructorState = {
  burgerConstructor: TIngredientWithUniqueId[];
  bun: { ingredient: TIngredient } | null;
};

export const initialState: TBurgerConstructorState = {
  burgerConstructor: [],
  bun: null,
};

export const burderConstructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions
): TBurgerConstructorState => {
  switch (action.type) {
    case CLEAR_CONSTRUCTOR:
      return {
        ...state,
        burgerConstructor: [],
        bun: null,
      };
    case SET_BUN:
      return {
        ...state,
        bun: action.bun,
      };
    case ADD_INGREDIENT_TO_CONSTRUCTOR:
      return {
        ...state,
        burgerConstructor: [...state.burgerConstructor, action.payload],
      };
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR:
      return {
        ...state,
        burgerConstructor: [
          ...state.burgerConstructor.filter(
            (ingredient: TIngredientWithUniqueId) => {
              if (ingredient.uniqueId !== action.uuid) {
                return ingredient.ingredient;
              }
            }
          ),
        ],
      };
    case CHANGE_SUBSEQUENCE_BURGER_CONSTRUCTOR:
      const positionDrag = action.positionDragElement.positionList;
      const positionDropTarget = action.positionDropTargetElement;

      if (positionDrag === positionDropTarget) return state;
      else if (positionDrag < positionDropTarget) {
        return {
          ...state,
          burgerConstructor: [
            ...state.burgerConstructor.slice(0, positionDrag),
            ...state.burgerConstructor.slice(
              positionDrag + 1,
              positionDropTarget
            ),
            state.burgerConstructor[positionDrag],
            ...state.burgerConstructor.slice(
              positionDropTarget,
              state.burgerConstructor.length
            ),
          ],
        };
      } else {
        return {
          ...state,
          burgerConstructor: [
            ...state.burgerConstructor.slice(0, positionDropTarget),
            state.burgerConstructor[positionDrag],
            ...state.burgerConstructor.slice(positionDropTarget, positionDrag),
            ...state.burgerConstructor.slice(
              positionDrag + 1,
              state.burgerConstructor.length
            ),
          ],
        };
      }
    default:
      return state;
  }
};
