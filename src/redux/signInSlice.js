import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { SIGN_IN } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";
import {toastobj} from "../utility/toastobj";

const initialState = {
  currentUse: {},
  loading: false,
  isLoggedIn: false,
  error: "",
  isAuth: localStorage.getItem("token") ? true : false,
  token: "",
  data: [],
  success:"",
  sign:false,
  toastMsg:"",
  errormessage:"",
  
};

export const signInUser = createAsyncThunk("signIn/signInUser", (data) => {
  return RequestAPi.post(SIGN_IN, data.data).then((response) => response);
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
      state.errormessage=action.payload.data.errormessage||"";
      state.success=action.payload.data.success;
      localStorage.setItem("userId", action.payload.data.userId);
      localStorage.setItem(
        "token",
        "Basic " +
          btoa(action.meta.arg.data.Username + ":" + action.meta.arg.data.Password)
      );
      state.token=localStorage.getItem("token");
      
     
       if(!action.payload.data.success){
        state.loading=false
        toast.error("Wrong Credential" ,toastobj )
      } else{
        state.loading=false
        toast.success('Logged In Successfully',toastobj);
        action.meta.arg.navigate("/dashboard");
      }
   
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.isLoggedIn = false;
    });
  },
});

export default signInSlice.reducer;
