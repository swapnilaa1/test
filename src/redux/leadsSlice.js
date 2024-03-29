import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_COMPONY_MEM, GET_LEADS } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";

const initialState = {
  localLeadData: [],
};

export const getLeads = createAsyncThunk("mytask/getLeads", (data) => {
  return RequestAPi.post(GET_LEADS, {
    From: 1,
    To: -1,
    Text: "",
  }).then((response) => response);
});
const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLeads.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(getLeads.fulfilled, (state, action) => {
      const data = action.payload.data.data.Leads
      state.localLeadData=data;
    });
    builder.addCase(getLeads.rejected, (state, action) => {
    });
  },
});

export default leadsSlice.reducer;
