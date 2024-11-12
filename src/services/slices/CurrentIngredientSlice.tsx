import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../../utils/Types";
import { IngredientDetailsProps } from "../../utils/Types";

const initialState: IngredientDetailsProps = {
  ingredient: null,
};

export const currentIngredientSlice = createSlice({
  name: "CurrentIngredientSlice",
  initialState,
  reducers: {
    SET_INGREDIENT_INFO(state, action: PayloadAction<Ingredient>) {
      state.ingredient = action.payload;
    },
    REMOVE_INGREDIENT_INFO(state) {
      state.ingredient = null;
    },
  },
});

export const { SET_INGREDIENT_INFO, REMOVE_INGREDIENT_INFO } =
  currentIngredientSlice.actions;

export const currentIngredientReducer = currentIngredientSlice.reducer;
