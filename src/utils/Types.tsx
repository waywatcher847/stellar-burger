import { number } from "prop-types";
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
  ingredient: Ingredient | null;
}

export interface RequestDataProps {
  url: string;
  options: () => RequestInit;
}

export interface GetIngredientListProps {
  url: string;
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
export interface OrderResponse {
  name: string;
  order: {
    number: number | null;
  };
}
export interface ExpectedStructure {
  success: boolean;
  data: IngredientList;
}
export interface ExpectedStructureOrder {
  success: boolean;
  name: string;
  order: {
    number: number | null;
  };
}
export interface OrderDetailsType {
  loading: boolean;
  order: ExpectedStructureOrder;
}

export interface IngredientsType {
  loading: boolean;
  success: boolean;
  error: string | null;
  ingredients: ExpectedStructure;
}
export interface CurrentIngredientType {
  loading: boolean;
  currentIngridient: Ingredient;
}

export interface UniqueItem {
  uniqid: string;
  item: Ingredient;
}
export interface ItemStack extends Array<UniqueItem> {}

export interface СonstructorState {
  bun: Ingredient | null;
  ingredients: UniqueItem[];
  totalPrice: number;
}

export interface IngredientsType {
  loading: boolean;
  success: boolean;
  error: string | null;
  ingredients: ExpectedStructure;
}

export interface RootReducerType {
  currentIngridient: CurrentIngredientType;
  ingridients: IngredientsType;
  burgerConstrucor: СonstructorState;
  orderDetails: OrderDetailsType;
}

export type LocationApp = {
  state: { background: Location | any };
};
export interface DragType {
  from: number;
  to: number;
}

export interface ItemCardDND {
  itemCard: Ingredient;
}

export type TUser = {
  email: string;
  name: string;
};

export type TServerResponse<T> = {
  success: boolean;
} & T;

export type TIngredientsResponse = TServerResponse<{
  data: Ingredient[];
}>;
export type TOrderResponse = TServerResponse<{
  name: string;
  order: {
    number: number | null;
  };
}>;
export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};
export type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;
export type TLoginData = {
  email: string;
  password: string;
};

export type TUserResponse = TServerResponse<{ user: TUser }>;
