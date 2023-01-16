import { configureStore } from "@reduxjs/toolkit";
import myTasksReducer from "./myTasksSlice";
import signInReducer from "./signInSlice";

export const store = configureStore({
  reducer: {
    mytasksReducer: myTasksReducer,
    signInReducer: signInReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
