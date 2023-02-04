import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CALL_AT_START,
  DELETE_TASK,
  POST_UPDATE_TASK,
} from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";

const initialState = {
  // Message: "",
  dataObj: {},
};

export const atStart = createAsyncThunk("start/atStart", (data) => {
  console.log("deleteTask");
  //return RequestAPi.post(GET_LEADS, data).then((response) => response);
  return RequestAPi.get(`${CALL_AT_START}?url=testffc.nimapinfotech.com`).then(
    (response) => response
  );
});
const atStartSlice = createSlice({
  name: "start",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(atStart.pending, (state) => {
      //  state.loading = true;
      // state.isAuth = false;
      state.Message = "";
    });
    builder.addCase(atStart.fulfilled, (state, action) => {
      console.log("action in start task", action.payload);
      state.dataObj = action.payload.data;
      console.log("state obje", state.dataObj);
    });
    builder.addCase(atStart.rejected, (state, action) => {
      console.log("rejected delte");
    });
  },
});

export default atStartSlice.reducer;
