import { configureStore } from "@reduxjs/toolkit";
import user  from "./slice/user/user.slice";
import message from "./slice/message/message.slice";
import socket from "./slice/socket/socket.slice";

export const store = configureStore({
  reducer: {
    user,
    message,
    socket,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false, // Disable serializable check for socket.io
  }),
});
