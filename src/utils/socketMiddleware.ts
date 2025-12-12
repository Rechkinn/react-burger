import type { Middleware, MiddlewareAPI } from "redux";
import type {
  TApplicationActions,
  AppDispatch,
  RootState,
} from "./additionalStorageTyping";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../services/actions/web-socket";
import { updateTokens } from "../services/actions/token";
import { getCookie } from "./cookie";
import { WSS_URL } from "./consts";

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TApplicationActions) => {
      const { dispatch } = store;

      if (action.type === WS_CONNECTION_START) {
        try {
          socket = new WebSocket(action.wsUrl);
        } catch {
          dispatch(updateTokens());
          socket = new WebSocket(`${WSS_URL}?token=${getCookie("token")}`);
        }
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({
            type: WS_CONNECTION_SUCCESS,
          });
        };

        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData: any = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          console.log("restParsedData");
          console.log(restParsedData);
          dispatch({
            type: WS_GET_MESSAGE,
            payload: { ...parsedData },
          });
        };

        socket.onclose = (event) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

        if (action.type === WS_SEND_MESSAGE) {
          const payload = action.payload;
          const message = { ...(payload as any) };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
