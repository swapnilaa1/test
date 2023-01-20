import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { POST_UPDATE_TASK } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";

const initialState = {
  localLeadData: [],
};

export const postStatus = createAsyncThunk(
  "poststatusupdate/postStatus",
  (data) => {
    //console.log("data in getleads", data);
    //return RequestAPi.post(GET_LEADS, data).then((response) => response);
    return RequestAPi.post(POST_UPDATE_TASK, {
      TaskId: 733,
      TaskStatusValue: 60,
    }).then((response) => response);
  }
);
const postStatusUpdateSlice = createSlice({
  name: "poststatusupdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postStatus.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(postStatus.fulfilled, (state, action) => {
      console.log("actiom in post Status succes", action.payload);
      //const data = action.payload.data.data.TaskList;
      //state.localData = data;
    });
    builder.addCase(postStatus.rejected, (state, action) => {
      console.log("rejected post");
    });
  },
});

export default postStatusUpdateSlice.reducer;
