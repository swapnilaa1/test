import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_MY_TASKS, SIGN_IN } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";

const initialState = {
  //currentUse: {},
  //loading: false,
  //isLoggedIn: false,
  //error: "",
  //isAuth: localStorage.getItem("token") ? true : false,
  //token: "",
  localData: [],
};

export const getMyTasks = createAsyncThunk("mytask/getMyTasks", (data) => {
  console.log("data in action", data);
  return RequestAPi.post(GET_MY_TASKS, data).then((response) => response);
});
const myTasksSlice = createSlice({
  name: "mytask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyTasks.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(getMyTasks.fulfilled, (state, action) => {
      console.log("actiom in my task success", action.payload);
      const data = action.payload.data.data.TaskList;
      state.localData = data;
      // state.loading = false;
      // state.isAuth = true;
      // state.isLoggedIn = true;
      // console.log("action payload", action);
      // state.error = "";
      // state.token = action.payload.data.token;
      // localStorage.setItem("token", action.payload.data.token);
      // action.meta.arg[1]("/dashboard");
      //console.log("action.meta.arg", action.meta.arg);
    });
    builder.addCase(getMyTasks.rejected, (state, action) => {
      // state.loading = false;
      // state.isAuth = false;
      // state.isLoggedIn = false;
      // console.log("error action in rejected", action);
      //state.error = action.error.message;
    });
  },
});

export default myTasksSlice.reducer;
