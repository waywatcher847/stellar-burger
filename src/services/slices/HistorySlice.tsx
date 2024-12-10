import { TOrder } from "../../utils/Types";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { OrderByIDRequest } from "../../utils/normaAPI";

type TInitialState = {
  wsError: string | null;
  orders: TOrder[];
};

const initialState: TInitialState = {
  wsError: null,
  orders: [],
};

export const getOrderById = createAsyncThunk(
  "getOrderByID",
  async (number: string, { dispatch }) => {
    const response = await OrderByIDRequest(number);
    if (response.success) {
      return response;
    }
  },
);

export const HistorySlice = createSlice({
  name: "socketProfileOrders",
  initialState,
  reducers: {
    onError: (state, action: PayloadAction<string>) => {
      state.wsError = action.payload;
    },
    onMessage: (state, action) => {
      state.orders = action.payload.orders.reverse();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderById.fulfilled, (state, action) => {
        if (action.payload != undefined) {
          state.orders = action.payload.orders;
        }
      })
      .addCase(getOrderById.rejected, (state) => {
        state.wsError = "Не удвлось получить данные заказа";
      });
  },
});

export const { onError, onMessage } = HistorySlice.actions;
export const historyReducer = HistorySlice.reducer;

export const historyOrdersSelector = (state: RootState) => state.history.orders;
