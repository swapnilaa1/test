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
  success:"",
  
};

export const signInUser = createAsyncThunk("signIn/signInUser", (data) => {
  console.log("data in action", data);
  return RequestAPi.post(SIGN_IN, {Username:"8113899206" , Password:"12345678"}).then((response) => response);
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
      console.log("action in sign in  " , action)
      console.log("action pay load in sign", action.payload.data.userId);
      state.success=action.payload.success;
      localStorage.setItem("userId", action.payload.data.userId);
      localStorage.setItem(
        "token",
        "Basic " +
          btoa(action.meta.arg.Username + ":" + action.meta.arg.Password)
      );
      state.token=localStorage.getItem("token")
      // setTimeout(()=>{
      //   action.meta.arg.navigate("/dashboard");
      // } ,4000)
      
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
