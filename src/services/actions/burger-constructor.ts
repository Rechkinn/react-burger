import { v4 as uuid } from "uuid";
import { TIngredient, TIngredientWithUniqueId } from "../../utils/types";

export const ADD_INGREDIENT_TO_CONSTRUCTOR: "ADD_INGREDIENT_TO_CONSTRUCTOR" =
  "ADD_INGREDIENT_TO_CONSTRUCTOR";
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR: "REMOVE_INGREDIENT_FROM_CONSTRUCTOR" =
  "REMOVE_INGREDIENT_FROM_CONSTRUCTOR";
export const SET_BUN: "SET_BUN" = "SET_BUN";
export const CHANGE_SUBSEQUENCE_BURGER_CONSTRUCTOR: "CHANGE_SUBSEQUENCE_BURGER_CONSTRUCTOR" =
  "CHANGE_SUBSEQUENCE_BURGER_CONSTRUCTOR";
export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";

export interface IAddIngredientToConstructorAction {
  readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  readonly payload: TIngredientWithUniqueId;
}
export interface IRemoveIngredientFromConstructorAction {
  readonly type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly uuid: string;
}
export interface ISetBunAction {
  readonly type: typeof SET_BUN;
  readonly bun: { ingredient: TIngredient };
}
export interface IChangeSubsequenceBurgerConstructorAction {
  readonly type: typeof CHANGE_SUBSEQUENCE_BURGER_CONSTRUCTOR;
  readonly positionDropTargetElement: number;
  readonly positionDragElement: { positionList: number };
}
export interface IClearConstructorAction {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TBurgerConstructorActions =
  | IAddIngredientToConstructorAction
  | IRemoveIngredientFromConstructorAction
  | ISetBunAction
  | IChangeSubsequenceBurgerConstructorAction
  | IClearConstructorAction;

export const addIngridient = (item: any) => {
  return {
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    payload: {
      ...item,
      uniqueId: uuid(),
    },
  };
};
