import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { POST_MY_TEAM, POST_UPDATE_TASK } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";

const initialState = {
  TeamMembers: [],
  isTeamLoading:true,
};

export const postGetTeams = createAsyncThunk(
  "postgetteams/postGetTeams",
  (data) => {
    return RequestAPi.post(POST_MY_TEAM, data).then((response) => response);
  }
);
const postGetTeamsSlice = createSlice({
  name: "postgetteams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postGetTeams.pending, (state) => {
      state.isTeamLoading=true;
      state.Message = "";
    });
    builder.addCase(postGetTeams.fulfilled, (state, action) => {
     
      state.TeamMembers = action.payload.data.data.teamMembers;
     state.isTeamLoading=false;
    });
    builder.addCase(postGetTeams.rejected, (state, action) => {
    });
  },
});

export default postGetTeamsSlice.reducer;
