import { RootState } from "../services/store";
import { refreshToken } from "../utils/normaAPI";
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";
import { Middleware } from "redux";

export type TwsActionTypes = {
  onOpen?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<MessageEvent<string>>;
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsSendMessage?: ActionCreatorWithPayload<MessageEvent<string>>;
};

export const feedMiddleware = (
  wsActions: TwsActionTypes,
  withRefreshToken = false,
): Middleware<RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let url = "";
    const {
      wsConnect,
      wsDisconnect,
      wsSendMessage,
      onOpen,
      onClose,
      onError,
      onMessage,
    } = wsActions;
    const { dispatch } = store;

    return (next) => (action) => {
      if (wsConnect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);

        socket.onopen = () => {
          onOpen && dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError("Error"));
        };

        socket.onmessage = (event: MessageEvent<string>) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          if (
            withRefreshToken &&
            parsedData.message === "Invalid or missing token"
          ) {
            refreshToken()
              .then((refreshData) => {
                const wssURL = new URL(url);
                wssURL.searchParams.set(
                  "token",
                  refreshData.accessToken.replace("Bearer ", ""),
                );
                dispatch(wsConnect(wssURL.toString()));
              })
              .catch((err) => {
                dispatch(onError(err.message));
              });

            dispatch(wsDisconnect());

            return;
          }

          dispatch(onMessage(parsedData));
        };

        socket.onclose = () => {
          onClose && dispatch(onClose());
        };
      }

      if (socket && wsSendMessage && wsSendMessage.match(action)) {
        socket.send(JSON.stringify(action.payload));
      }

      if (socket && wsDisconnect.match(action)) {
        socket.close();
        socket = null;
      }

      next(action);
    };
  };
};
