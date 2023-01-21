import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { POST_MY_TEAM, POST_UPDATE_TASK } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";

const initialState = {
  TeamMembers: [],
};

export const postGetTeams = createAsyncThunk(
  "postgetteams/postGetTeams",
  (data) => {
    console.log("postgetTeams", data);
    //return RequestAPi.post(GET_LEADS, data).then((response) => response);
    return RequestAPi.post(POST_MY_TEAM, data).then((response) => response);
  }
);
const postGetTeamsSlice = createSlice({
  name: "postgetteams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postGetTeams.pending, (state) => {
      //  state.loading = true;
      // state.isAuth = false;
      state.Message = "";
    });
    builder.addCase(postGetTeams.fulfilled, (state, action) => {
      console.log(
        "actiom in post TEam succes",
        action.payload.data.data.teamMembers
      );
      //const data = action.payload.data.data.TaskList;
      //state.localData = data;
      state.TeamMembers = action.payload.data.data.teamMembers;
      //state.Message = action.payload.data.Message;
    });
    builder.addCase(postGetTeams.rejected, (state, action) => {
      console.log("rejected post");
    });
  },
});

export default postGetTeamsSlice.reducer;
