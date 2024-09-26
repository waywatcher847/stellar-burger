export interface Ingredient {
  _id: string;
  name: string;
  type: "bun" | "sauce" | "main";
  proteins: number;
  calories: number;
  fat: number;
  carbohydrates: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}
export interface IngredientTab extends Array<Ingredient> {}

export interface ingredientCardProps {
  idx: number;
  itemCard: Ingredient;
}
export interface IngredientPanelProps {
  currentTab: string;
}
export interface BurgerTabProps {
  tabName: string;
  currentTab: string;
  clickHandler: (p: string) => void;
}
export interface IdList extends Array<string> {}

export interface BurgerStackProps {
  idList: IdList;
  itemList: IngredientTab;
}
export interface IngredientPanelProps {
  currentTab: string;
}
