import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { DELETE_TASK, POST_UPDATE_TASK } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";
import { toastobj } from "../utility/toastobj";

const initialState = {
  Message: "",
  isDeleting:false,
};

export const deleteTask = createAsyncThunk("delete/deleteTask", (data) => {
  return RequestAPi.get(`${DELETE_TASK}?taskId=${data.data.taskId}`).then(
    (response) => response
  );
});
const deletetaskSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteTask.pending, (state) => {
      state.isDeleting=true;
      state.Message = "";
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isDeleting=false;
      
      state.Message = action.payload.data.Message;
      action.meta.arg.fun !== undefined && action?.meta?.arg?.fun(false);
      toast.success("Task Deleted Successfully" , toastobj)
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isDeleting=false;
      toast.error("Something Went Wrong" , toastobj);
    });
  },
});

export default deletetaskSlice.reducer;
