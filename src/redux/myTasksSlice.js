import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_MY_TASKS, SIGN_IN } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";

const initialState = {
  sendData: {
    TaskStatus: "",
    Priority: "",
    UserId: "",
    FromDueDate: "",
    ToDueDate: "",
    IsArchive: false,
    From: 1,
    To: 10,
    SortByDueDate: "",
    Title: "",
    UserIds: [],
    SortColumn: "",
    SortOrder: "",
  },
  difference:10,
  toToDisplay:1,
  localData: [],
  count:"",
};

export const getMyTasks = createAsyncThunk("mytask/getMyTasks", (data) => {
  console.log("data in action", data);
  return RequestAPi.post(GET_MY_TASKS, data).then((response) => response);
});
const myTasksSlice = createSlice({
  name: "mytask",
  initialState,
  reducers: {
    setDifference:(state , action )=>{
      state.difference=action.payload
    },
    setFrom:(state , action)=>{
      state.sendData.From=action.payload
      
    },
    setTo:(state  ,action)=>{
      state.sendData.To=action.payload.To;
    },
    setTOTODisplay:(state , action)=>{

    },
    setSortData: (state, action) => {
      state.sendData.SortColumn = action.payload.column;
      state.sendData.SortOrder = action.payload.order;
    },

    setTitle: (state, action) => {
      console.log("action payload in ste title", action.payload);
      state.sendData.Title = action.payload;
    },

    setSearchParams: (state, action) => {
      console.log("action payload while setting params", action.payload);
      state.sendData.FromDueDate = action.payload.FromDueDate;
      state.sendData.ToDueDate = action.payload.ToDueDate;
      state.sendData.UserIds = action.payload.userIds;
      state.sendData.UserId = action.payload.UserId;
      state.sendData.Priority = action.payload.filterObject.Priority;
      state.sendData.TaskStatus = action.payload.filterObject.TaskStatus;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyTasks.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(getMyTasks.fulfilled, (state, action) => {
      console.log("actiom in my task success", action.payload);
      const data = action.payload.data.data.TaskList;
      state.localData = data;
      state.count=action.payload.data.data.TotalCount
      // state.loading = false;
      // state.isAuth = true;
      // state.isLoggedIn = true;
      // console.log("action payload", action);
      // state.error = "";
      // state.token = action.payload.data.token;
      // localStorage.setItem("token", action.payload.data.token);
      // action.meta.arg[1]("/dashboard");
      //console.log("actio ,n.meta.arg", action.meta.arg);
    });
    builder.addCase(getMyTasks.rejected, (state, action) => {
      // state.loading = false;
      // state.isAuth = false;
      // state.isLoggedIn = false;
      // console.log("error action in rejected", action);
      //state.error = action.error.message;
    });
  },
});

export default myTasksSlice.reducer;
export const {setDifference ,setSortData, setTitle, setSearchParams , setFrom , setTo ,setTOTODisplay} = myTasksSlice.actions;
