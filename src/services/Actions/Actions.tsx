import {
  createAction,
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";

export const hConnect = createAction<string, "WS_HISTORY_FEED_CONNECT">(
  "WS_HISTORY_FEED_CONNECT",
);
export const hDisconnect = createAction("WS_HISTORY_FEED_DISCONNECT");
export const connect = createAction<string, "WS_FEED_CONNECT">(
  "WS_FEED_CONNECT",
);
export const disconnect = createAction("WS_FEED_DISCONNECT");
