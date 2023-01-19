import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SIGN_IN } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";

const initialState = {
  currentUse: {},
  loading: false,
  isLoggedIn: false,
  error: "",
  isAuth: localStorage.getItem("token") ? true : false,
  token: "",
  data: [],
};

export const signInUser = createAsyncThunk("signIn/signInUser", (data) => {
  // console.log("data in action", data);
  return RequestAPi.post(SIGN_IN, data).then((response) => response);
});
const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInUser.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      // console.log("action ", action);
      // console.log("action payload in success", action.payload);
      // state.loading = false;
      // state.isAuth = true;
      // state.isLoggedIn = true;
      // console.log("action payload", action);
      // state.error = "";
      // state.token = action.payload.data.token;
      // console.log(
      // "hello ",
      // typeof action.meta.arg.Username + ":" + action.meta.arg.Password
      //);
      localStorage.setItem(
        "token",
        "Basic " +
          btoa(action.meta.arg.Username + ":" + action.meta.arg.Password)
      );
      // action.meta.arg[1]("/dashboard");
      //console.log("action.meta.arg", action.meta.arg);
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.isLoggedIn = false;
      console.log("error action in rejected", action);
      //state.error = action.error.message;
    });
  },
});

export default signInSlice.reducer;
