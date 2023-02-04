import { configureStore } from "@reduxjs/toolkit";
import myTasksReducer from "./myTasksSlice";
import signInReducer from "./signInSlice";
import leadsReducer from "./leadsSlice";
import companyMemberReducers from "./companyMemberSlice";
import getTaskStatusReducer from "./getTaskStatusSlice";
import postStatusUpdateReducer from "./postStatusUpdateSlice";
import postTeamReducer from "./postGetTeamsSlice";
import deleteTaskReducer from "./deletetaskSlice";
import startReducer from "./atStartSlice";
export const store = configureStore({
  reducer: {
    mytasksReducer: myTasksReducer,
    signInReducer: signInReducer,
    leadsReducer: leadsReducer,
    companyMemberReducers: companyMemberReducers,
    getTaskStatusReducer: getTaskStatusReducer,
    postStatusUpdateReducer: postStatusUpdateReducer,
    postTeamReducer: postTeamReducer,
    deleteTaskReducer: deleteTaskReducer,
    startReducer: startReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
