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
  difference: 10,
  toToDisplay: 1,
  localData: [],
  count: "",
  rightCalled: false,
  leftCalled: false,
};

export const getMyTasks = createAsyncThunk("mytask/getMyTasks", (data) => {
  console.log("data in action", data);
  return RequestAPi.post(GET_MY_TASKS, data).then((response) => response);
});
const myTasksSlice = createSlice({
  name: "mytask",
  initialState,
  reducers: {
    setEndFromAndTo: (state, action) => {
      state.rightCalled = true;
      state.sendData.From = parseInt(state.count / state.difference) * 10 + 1;
      console.log("from", state.sendData.From);
      state.sendData.To = state.count;
    },
    setStartFromAndTo: (state, action) => {
      state.leftCalled = true;
      state.sendData.From = 1;
      state.sendData.To = state.difference;
    },
    setDifference: (state, action) => {
      state.difference = action.payload;
      state.sendData.To = state.sendData.From - 1 + state.difference;
    },
    setFromAndTo: (state, action) => {
      if (action.payload.direction === "ltr") {
        console.log("in ltr");
        state.sendData.From = state.sendData.To + 1;
        console.log("from data checked");
        state.sendData.To = state.sendData.From + state.difference - 1;
        console.log("to data checked", state.sendData.To);
      } else {
        if (Math.sign(state.sendData.From - 1 - state.difference) !== -1) {
          state.sendData.To = state.sendData.From - 1;
          state.sendData.From = state.sendData.From - state.difference;
        } else {
          state.sendData.To = state.sendData.From - 1;
          state.sendData.From = 1;
        }
        // state.sendData.From = state.sendData.To + 1;
        // state.sendData.To = state.difference + state.difference;
      }
    },
    // setTo: (state, action) => {
    //   state.sendData.To = action.payload.To;
    // },
    setTOTODisplay: (state, action) => {},
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
      state.count = action.payload.data.data.TotalCount;
      console.log("state count", state.count);
      //state.toToDisplay=localData.le

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

      // action.meta.arg[1]("/dashboard");
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
export const {
  setFromAndTo,
  setDifference,
  setSortData,
  setTitle,
  setSearchParams,
  setEndFromAndTo,
  setStartFromAndTo,
  // setFrom,
  // setTo,
  setTOTODisplay,
} = myTasksSlice.actions;
