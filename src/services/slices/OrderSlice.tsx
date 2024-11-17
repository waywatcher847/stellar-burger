import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  OrderDetailsType,
  IdList,
  ExpectedStructureOrder,
} from "../../utils/Types";
import { orderRequest } from "../../utils/normaAPI";
import { RootState } from "../store";

const initialState: OrderDetailsType = {
  loading: false,
  order: { success: false, name: "", order: { number: null } },
};
export const selectNewOrder = (state: RootState): ExpectedStructureOrder =>
  state.orderDetails.order;

export const fetchNewOrder = createAsyncThunk(
  "fetchNewOrder",
  async (ingredients: IdList, { dispatch }) => {
    const response = await orderRequest(ingredients);
    if (response.success) {
      return response;
    }
  },
);
export const ordersSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {
    DROP_ORDER(state) {
      state.order.order.number = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        if (action.payload != undefined) {
          state.loading = false;
          state.order = action.payload;
        }
      })
      .addCase(fetchNewOrder.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { DROP_ORDER } = ordersSlice.actions;

export const orderReducer = ordersSlice.reducer;
