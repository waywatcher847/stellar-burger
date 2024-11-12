import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  СonstructorState,
  Ingredient,
  UniqueItem,
  DragType,
} from "../../utils/Types";
import uniqid from "uniqid";

const initialState: СonstructorState = {
  bun: null,
  ingredients: [],
  totalPrice: 0,
};

export const constructorItemsSlice = createSlice({
  name: "constructorItems",
  initialState,
  reducers: {
    ADD_BUN: {
      reducer(state, action: PayloadAction<Ingredient>) {
        state.bun = action.payload;
      },
      prepare(ingredient: Ingredient) {
        return { payload: ingredient };
      },
    },
    ADD_INGREDIENT: {
      reducer(state, action: PayloadAction<UniqueItem>) {
        state.ingredients.push(action.payload);
      },
      prepare(ingredient: Ingredient) {
        return { payload: { item: ingredient, uniqid: uniqid() } };
      },
    },
    REMOVE_INGREDIENT(state, action: PayloadAction<UniqueItem>) {
      state.ingredients = state.ingredients.filter((item) => {
        return item.uniqid !== action.payload.uniqid;
      });
    },
    SET_TOTALPRICE(state) {
      const bunPrice = !state.bun ? 0 : state.bun.price * 2;
      state.totalPrice =
        state.ingredients.reduce((sum, ingr) => sum + ingr?.item.price, 0) +
        bunPrice;
    },
    DROP_TOTALPRICE(state) {
      state.totalPrice = 0;
    },
    MOVE_INGREDIENT(state, action: PayloadAction<DragType>) {
      const prevState = state.ingredients;
      const item = prevState[action.payload.from];

      prevState.splice(action.payload.from, 1);
      prevState.splice(action.payload.to, 0, item);
      state.ingredients = prevState;
    },
  },
});

export const {
  ADD_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_TOTALPRICE,
  DROP_TOTALPRICE,
  MOVE_INGREDIENT,
} = constructorItemsSlice.actions;

export const burgerConstructorReducer = constructorItemsSlice.reducer;
