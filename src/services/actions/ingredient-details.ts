import { TIngredient } from "../../utils/types";

export const ADD_INGREDIENT_DETAILS: "ADD_INGREDIENT_DETAILS" =
  "ADD_INGREDIENT_DETAILS";
export const REMOVE_INGREDIENT_DETAILS: "REMOVE_INGREDIENT_DETAILS" =
  "REMOVE_INGREDIENT_DETAILS";

export interface IAddIngredientDetailsAction {
  readonly type: typeof ADD_INGREDIENT_DETAILS;
  readonly ingredientDetails: TIngredient;
}
export interface IRemoveIngredientDetailsAction {
  readonly type: typeof REMOVE_INGREDIENT_DETAILS;
}

export type TIngredientDetailsActions =
  | IAddIngredientDetailsAction
  | IRemoveIngredientDetailsAction;
