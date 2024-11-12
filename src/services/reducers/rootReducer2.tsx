import { combineReducers } from "redux";
import { ingredientsReducer } from "../slices/IngredientsSlice";
import { burgerConstructorReducer } from "../slices/ConstructorSlice";
import { currentIngredientReducer } from "../slices/CurrentIngredientSlice";
import { orderReducer } from "../slices/OrderSlice";
import { authReducer } from "../slices/authUserSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  currentIngridient: currentIngredientReducer,
  ingridients: ingredientsReducer,
  burgerConstrucor: burgerConstructorReducer,
  orderDetails: orderReducer,
});
