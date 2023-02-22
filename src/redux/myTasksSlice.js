import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { GET_MY_TASKS, SIGN_IN } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";
import { toast } from "react-toastify";
import { toastobj } from "../utility/toastobj";


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
  isListFetching:false,
  tasksLoading:true,
  isError:false,
  difference: 10,
  toToDisplay: 1,
  localData: [],
  count: "",
  rightCalled: false,
  leftCalled: false,
  dueToPaginatio:false,
  isPaginationLoading:false,
};

export const getMyTasks = createAsyncThunk("mytask/getMyTasks", (data) => {
  return RequestAPi.post(GET_MY_TASKS, data).then((response) => response);
});
const myTasksSlice = createSlice({
  name: "mytask",
  initialState,
  reducers: {
    isDueToPaginatio:(state)=>{
      state.dueToPaginatio=true;
    },
    setEndFromAndTo: (state, action) => {
      state.dueToPaginatio=true
      state.rightCalled = true;
      state.sendData.From = parseInt(state.count / state.difference) * 10 + 1;
      state.sendData.To = state.count;
    },
    setStartFromAndTo: (state, action) => {
      state.dueToPaginatio=true;
      state.leftCalled = true;
      state.sendData.From = 1;
      state.sendData.To = state.difference;
    },
    setDifference: (state, action) => {
      state.dueToPaginatio=true;
      state.difference = action.payload;
      if((state.sendData.From /state.difference)>=1){
          state.sendData.From=state.difference*Math.floor(state.sendData.From /state.difference)+1 
      }else{
        state.sendData.From=1;
      }
      state.sendData.To=state.sendData.From+state.difference-1

      

    },
    setFromAndTo: (state, action) => {
      state.dueToPaginatio=true;
      if (action.payload.direction === "ltr") {
        state.sendData.From = state.sendData.To + 1;
        state.sendData.To = state.sendData.From + state.difference - 1;
      } else {
        if (Math.sign(state.sendData.From - 1 - state.difference) !== -1) {
          state.sendData.To = state.sendData.From - 1;
          state.sendData.From = state.sendData.From - state.difference;
        } else {
          state.sendData.To = state.sendData.From - 1;
          state.sendData.From = 1;
        }
     
      }
    },
   
    setTOTODisplay: (state, action) => {},
    setSortData: (state, action) => {
      state.sendData.SortColumn = action.payload.column;
      state.sendData.SortOrder = action.payload.order;
    },

    setTitle: (state, action) => {
      state.sendData.Title = action.payload;
    },

    setSearch:(state , action)=>{
      if(action.payload==="All"){
        state.sendData.FromDueDate = "";
        state.sendData.ToDueDate = "";
        state.sendData.Priority ="" ;
        state.sendData.TaskStatus ="";
      }else if(action.payload==="TaskStatus"){
        state.sendData.TaskStatus ="";
      }else if(action.payload==="Priority"){
        state.sendData.Priority ="" ;
      }else if(action.payload==="FromDueDate"){
        state.sendData.FromDueDate = "";
        state.sendData.ToDueDate = "";
      }


      
    },

    setSearchParams: (state, action) => {
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
      state.isListFetching=true;
      state.tasksLoading = true;
      if(state.dueToPaginatio){
          state.isPaginationLoading=true;
      }
  
    });
    builder.addCase(getMyTasks.fulfilled, (state, action) => {
      state.isListFetching=false;
      if(state.dueToPaginatio){
        state.isPaginationLoading=false;
        state.dueToPaginatio=false;
    }
      state.tasksLoading=false;
      const data = action.payload.data.data.TaskList;
      state.localData = data;
      state.count = action.payload.data.data.TotalCount;

      if (state.count < state.sendData.To && !state.rightCalled) {
        state.toToDisplay = state.count;
      } else if (state.rightCalled) {
        state.toToDisplay = state.count;
      } else if (
        state.count >= state.difference ||
        state.count - state.toToDisplay < state.difference
      ) {
        state.toToDisplay = state.sendData.From - 1 + state.difference;
      }
      state.rightCalled = false;

    });
    builder.addCase(getMyTasks.rejected, (state, action) => {
      state.isListFetching=false;
      toast.error("Something Went Wrong" , toastobj)
    });
  },
});

export default myTasksSlice.reducer;
export const {
  setFromAndTo,
  setDifference,
  setSortData,
  setTitle,
  setSearchParams,
  setEndFromAndTo,
  setStartFromAndTo,
  setSearch,
  isDueToPaginatio,
  // setFrom,
  // setTo,
  setTOTODisplay,
} = myTasksSlice.actions;
