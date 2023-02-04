import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DELETE_TASK, POST_UPDATE_TASK } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";

const initialState = {
  Message: "",
};

export const deleteTask = createAsyncThunk("delete/deleteTask", (data) => {
  console.log("deleteTask", data.data.taskId);
  //return RequestAPi.post(GET_LEADS, data).then((response) => response);
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
      //  state.loading = true;
      // state.isAuth = false;
      state.Message = "";
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      console.log("action in delete task", action.payload, "arg", action);
      //const data = action.payload.data.data.TaskList;
      //state.localData = data;
      state.Message = action.payload.data.Message;
      action.meta.arg.fun !== undefined && action?.meta?.arg?.fun(false);
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      console.log("rejected delte");
    });
  },
});

export default deletetaskSlice.reducer;
