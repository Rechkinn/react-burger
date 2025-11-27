import { ReactNode } from "react";
import { EIngredientType } from "./consts";

export type TIconYandex =
  | "secondary"
  | "primary"
  | "error"
  | "success"
  | "disabled";

export type TIngredientType =
  | EIngredientType.BUN
  | EIngredientType.SAUCE
  | EIngredientType.MAIN;

export type TIngredient = {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TUpOrDown = "top" | "bottom";

export type TIngredientWithUniqueId = {
  ingredient: TIngredient;
  uniqueId: string;
};

export type TPropsWithReactNode = {
  element: ReactNode;
};

export type TLocation = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: any;
};
