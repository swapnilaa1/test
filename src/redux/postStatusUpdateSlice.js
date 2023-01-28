import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { POST_UPDATE_TASK } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";

const initialState = {
  Message: "",
};

export const postStatus = createAsyncThunk(
  "poststatusupdate/postStatus",
  (data) => {
    console.log("postStatus", data.data);
    //return RequestAPi.post(GET_LEADS, data).then((response) => response);
    return RequestAPi.post(POST_UPDATE_TASK, data.data).then((response) => response);
  }
);
const postStatusUpdateSlice = createSlice({
  name: "poststatusupdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postStatus.pending, (state) => {
      //  state.loading = true;
      // state.isAuth = false;
      state.Message = "";
    });
    builder.addCase(postStatus.fulfilled, (state, action) => {
      console.log("actiom in post Status succes", action.payload  ,"arg" , action);
      //const data = action.payload.data.data.TaskList;
      //state.localData = data;
      state.Message = action.payload.data.Message;
      action.meta.arg.fun!==undefined && action?.meta?.arg?.fun(false)
    });
    builder.addCase(postStatus.rejected, (state, action) => {
      console.log("rejected post");
    });
  },
});

export default postStatusUpdateSlice.reducer;
