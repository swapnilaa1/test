import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { GET_TASK_STATUS_FOR_PARTIAL } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";
import { toastobj } from "../utility/toastobj";

const initialState = {
  statusMaster: [],
  isTaskStatusLoading:false,
};

export const getTaskStatus = createAsyncThunk(
  "getTask/getTaskStatus",
  (data) => {
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
      state.isTaskStatusLoading=true;
    });
    builder.addCase(getTaskStatus.fulfilled, (state, action) => {
      state.statusMaster = action.payload.data.data;
      state.isTaskStatusLoading=false;
    });
    builder.addCase(getTaskStatus.rejected, (state, action) => {
      state.isTaskStatusLoading=false;
      toast.error("Something Went Wrong" , toastobj);
    });
  },
});

export default getTaskStatusSlice.reducer;
