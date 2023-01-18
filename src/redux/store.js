import { configureStore } from "@reduxjs/toolkit";
import myTasksReducer from "./myTasksSlice";
import signInReducer from "./signInSlice";
import leadsReducer from "./leadsSlice";
import companyMemberReducers from "./companyMemberSlice";

export const store = configureStore({
  reducer: {
    mytasksReducer: myTasksReducer,
    signInReducer: signInReducer,
    leadsReducer: leadsReducer,
    companyMemberReducers: companyMemberReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
