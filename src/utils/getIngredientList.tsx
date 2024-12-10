import { ExpectedStructure, UniqueItem, IngredientList } from "./Types";
import uniqid from "uniqid";

export function transformIngredients(
  expectedStructure: ExpectedStructure,
): UniqueItem[] {
  const ingredients: IngredientList = expectedStructure.data;
  const ingredientCardPropsList: UniqueItem[] = ingredients.map(
    (ingredient, index) => ({
      uniqid: uniqid(),
      item: ingredient,
    }),
  );

  return ingredientCardPropsList;
}
