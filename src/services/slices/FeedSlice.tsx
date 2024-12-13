import { TOrder } from "../../utils/Types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
type TInitialState = {
  wsError: string | null;
  total: number;
  totalToday: number;
  orders: TOrder[];
};

const initialState: TInitialState = {
  wsError: null,
  total: 0,
  totalToday: 0,
  orders: [],
};

export const feedSlice = createSlice({
  name: "socketAllOrders",
  initialState,
  reducers: {
    onError: (state, action: PayloadAction<string>) => {
      state.wsError = action.payload;
    },
    onMessage: (state, action) => {
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.orders = action.payload.orders;
    },
  },
});

export const { onError, onMessage } = feedSlice.actions;
export const feedReducer = feedSlice.reducer;

export const ordersSelector = (state: RootState) => state.feed.orders;
export const totalOrdersSelector = (state: RootState) => state.feed.total;
export const totalTodayOrdersSelector = (state: RootState) =>
  state.feed.totalToday;
