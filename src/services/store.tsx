import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/rootReducer";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { feedMiddleware } from "../middleware/feed";
import {
  connect as OrdersWsConnect,
  disconnect as OrdersWsDisconnect,
} from "../services/Actions/Actions";
import {
  onMessage as OrdersWsMessage,
  onError as OrdersWsError,
} from "../services/slices/FeedSlice";
import {
  hConnect as HistoryOrdersWsConnect,
  hDisconnect as HistoryOrdersWsDisconnect,
} from "../services/Actions/Actions";
import {
  onMessage as HistoryOrdersWsMessage,
  onError as HistoryOrdersWsError,
} from "../services/slices/HistorySlice";

const wsFeedActions = {
  wsConnect: OrdersWsConnect,
  wsDisconnect: OrdersWsDisconnect,
  onError: OrdersWsError,
  onMessage: OrdersWsMessage,
};

const wsHistoryActions = {
  wsConnect: HistoryOrdersWsConnect,
  wsDisconnect: HistoryOrdersWsDisconnect,
  onError: HistoryOrdersWsError,
  onMessage: HistoryOrdersWsMessage,
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      feedMiddleware(wsFeedActions),
      feedMiddleware(wsHistoryActions),
    ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch: () => AppDispatch = dispatchHook;
