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


export interface IngredientCardProps {
  idx: number;
  itemCard: Ingredient;
}
export interface IngredientPanelProps {
  currentTab: string;
  data: IngredientList;
}
export interface BurgerTabProps {
  tabName: string;
  currentTab: string;
  clickHandler: (p: string) => void;
}
export interface IdList extends Array<string> {}

export interface BurgerStackProps {
  itemList: ItemStack;
}
export interface StackItemProps {
  ingredient: UniqueItem;
  idx: number;
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
  orderResponse:  OrderDetailsType ;
}
export interface RequestDataProps {
  url: string;
  options: () => RequestInit;
}

export interface GetIngredientListProps {
  url: string;
}
export interface ExpectedStructure {
  success: boolean;
  data: IngredientList;
}
export interface FetchData {
  fetchedData: ExpectedStructure | null;
  loading: boolean;
  error: string | null;
}
export interface BurgerConstructorProps {
  data: IngredientList;
}
export interface BurgeringredientProps {
  data: IngredientList;
}
export interface OrderResponseStructure {
  name: string;
  order:{number: number};
  success: boolean;
} 

export  interface IngredientsType {
  loading: boolean,
  success: boolean,
  error: boolean,
  ingridients: ExpectedStructure,
};
export  interface  CurrentIngredientType {
  currentIngridient: Ingredient,
};

export interface  UniqueItem {
  uniqid: number,
  item: Ingredient,
}
export interface  ItemStack extends Array<UniqueItem> { }

export interface  СonstructorState {
  bun: Ingredient | null;
  ingredients: ItemStack | [];
  totalPrice: number;
}

export  interface  OrderDetailsType {
  loading: boolean,
  name: string,
  order: {
      number: number,
  },
  success: boolean,
};

export  interface rootReducerType{
  currentIngridient:CurrentIngredientType;
  ingridients:IngredientsType;
  burgerConstrucor:СonstructorState;
  orderDetails:OrderDetailsType;
}