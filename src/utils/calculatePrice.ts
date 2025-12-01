import { TIngredient } from "./types";

export function calculatePrice(
  arrayIds: string[],
  burgerIngredients: TIngredient[]
): number {
  return arrayIds.reduce((acc: number, ingredientId: string) => {
    const ingredient = burgerIngredients.find(
      (ingredient: TIngredient) => ingredient._id === ingredientId
    );
    return ingredient ? acc + ingredient.price : acc;
  }, 0);
}
