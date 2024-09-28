import { ReactNode } from "react";
 
export interface ingredient {
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
export interface ingredientList extends Array<ingredient> {}

export interface ingredientCardProps {
  idx: number;
  itemCard: ingredient;
}
export interface ingredientPanelProps {
  currentTab: string;
}
export interface burgerTabProps {
  tabName: string;
  currentTab: string;
  clickHandler: (p: string) => void;
}
export interface idList extends Array<string> {}

export interface burgerStackProps {
  idList: idList;
  itemList: ingredientList;
}
export interface ingredientPanelProps {
  currentTab: string;
  data: ingredientList;
}
export interface modalOverlayProps {
  open?: boolean;
  title?: string;
  children?: ReactNode;
  onClose: (e: any) => void;
}
export interface ingredientDetailsProps {
  ingredient: ingredient;
}

export interface orderDetailsProps {
  orderID: number;
}
export interface requestDataProps {
  url: string;
  options: () => RequestInit;
}

export interface getIngredientListProps {
  url: string;
}
export interface expectedStructure {
  success: boolean;
  data: ingredientList;
}
export interface fetchData {
  fetchedData: expectedStructure | null;
  loading: boolean;
  error: string | null;
}
export interface burgerConstructorProps {
  data: ingredientList;
}
export interface burgeringredientProps {
  data: ingredientList;
}
