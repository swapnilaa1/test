import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ASSIGNTASK, POST_UPDATE_TASK } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";
import { toastobj } from "../utility/toastobj";

const initialState = {
  Message: "",
  isPostLoading:false,
};

export const postStatus = createAsyncThunk(
  "poststatusupdate/postStatus",
  (data) => {
    return RequestAPi.post(POST_UPDATE_TASK, data.data).then((response) => response);
  }
);

export const addTask=createAsyncThunk(
  "poststatusupdate/addTask",
  (data)=>{
    return RequestAPi.post(ASSIGNTASK , data.data).then((response) => response);
  }
);
const postStatusUpdateSlice = createSlice({
  name: "poststatusupdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postStatus.pending, (state) => {
      state.Message = "";
      state.isPostLoading=true;
    });
    builder.addCase(postStatus.fulfilled, (state, action) => {
      state.isPostLoading=false;
      state.Message = action.payload.data.Message;
      action.meta.arg.fun!==undefined && action?.meta?.arg?.fun(false)
     const value= action.meta.arg.data.TaskStatusValue;
     value===0?toast.success("Task Accepted" ,toastobj):value===100?toast.success("Task Updated as Completed" , toastobj):toast.success("Task Updated as Partially Completed" , toastobj)
      
    });
    builder.addCase(postStatus.rejected, (state, action) => {
      state.isPostLoading=false;
      toast.error("Something Went Wrong" , toastobj);
    });

    builder.addCase(addTask.pending,(state)=>{
      state.isLoading=true;
    });
    builder.addCase(addTask.fulfilled,(state , action)=>{
      state.isLoading=false;
      toast.success("Task Added Successfully" , toastobj)
    });
    builder.addCase(addTask.rejected,(state)=>{
      state.isLoading=false;
      toast.error("Something Went Wrong");
    });

  },
});

export default postStatusUpdateSlice.reducer;
