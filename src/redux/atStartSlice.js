import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CALL_AT_START,
  DELETE_TASK,
  POST_UPDATE_TASK,
} from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";

const initialState = {
  dataObj: {},
};

export const atStart = createAsyncThunk("start/atStart", (data) => {
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
    
      state.Message = "";
    });
    builder.addCase(atStart.fulfilled, (state, action) => {
      state.dataObj = action.payload.data;
    });
    builder.addCase(atStart.rejected, (state, action) => {
    });
  },
});

export default atStartSlice.reducer;
