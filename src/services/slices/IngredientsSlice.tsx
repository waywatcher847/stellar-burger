import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IngredientsType } from "../../utils/Types";
import { getIngredientsRequest } from "../../utils/normaAPI";
import { RootState } from "../store";
import { ExpectedStructure } from "../../utils/Types";

export const selectIngredients = (state: RootState): ExpectedStructure =>
  state.ingridients.ingredients;

export const fetchIngredients = createAsyncThunk(
  "fetchIngredients",
  async () => {
    const data = await getIngredientsRequest();
    return data;
  },
);

const initialState: IngredientsType = {
  loading: false,
  success: false,
  error: null,
  ingredients: { success: false, data: [] },
};

export const ingredientsSlice = createSlice({
  name: "IngredientsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.ingredients = action.payload;
        }
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "";
      });
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;
