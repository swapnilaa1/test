import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_TASK_STATUS_FOR_PARTIAL } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";

const initialState = {
  localLeadData: [],
};

export const getTaskStatus = createAsyncThunk(
  "getTask/getTaskStatus",
  (data) => {
    //console.log("data in getleads", data);
    //return RequestAPi.post(GET_LEADS, data).then((response) => response);
    return RequestAPi.get(GET_TASK_STATUS_FOR_PARTIAL).then(
      (response) => response
    );
  }
);
const getTaskStatusSlice = createSlice({
  name: "getTask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTaskStatus.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(getTaskStatus.fulfilled, (state, action) => {
      console.log("actiom in post Status succes", action.payload);
      //const data = action.payload.data.data.TaskList;
      //state.localData = data;
    });
    builder.addCase(getTaskStatus.rejected, (state, action) => {
      console.log("rejected post");
    });
  },
});

export default getTaskStatusSlice.reducer;
