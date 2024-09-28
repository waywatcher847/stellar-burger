import { ReactNode } from "react";

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
export interface IngredientList extends Array<Ingredient> {}

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
  itemList: IngredientList;
}
export interface IngredientPanelProps {
  currentTab: string;
  data: IngredientList;
}
export interface ModalOverlayProps {
  open?: boolean;
  title?: string;
  children?: ReactNode;
  onClose: (e: any) => void;
}
export interface IngredientDetailsProps {
  ingredient: Ingredient;
}

export interface OrderDetailsProps {
  orderID: number;
}
export interface requestDataProps {
  url: string;
  options: () => RequestInit;
}

export interface WithFetchProps {
  url: string;
}
export interface ExpectedStructure {
  success: boolean;
  data: IngredientList;
}
export interface FetchedData {
  fetchedData: ExpectedStructure | null;
  loading: boolean;
  error: string | null;
}
export interface BurgerConstructorProps {
  data: IngredientList;
}
export interface BurgerIngredientProps {
  data: IngredientList;
}
