import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_COMPONY_MEM } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";

const initialState = {
  localCompanyData: [],
};

export const getCompMembers = createAsyncThunk("company/getCompMembers", () => {
  //return RequestAPi.post(GET_LEADS, data).then((response) => response);
  return RequestAPi.get(`${GET_COMPONY_MEM}?from=${1}&text=&to=${100}`).then(
    (response) => response
  );
});
const companyMemberSlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompMembers.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(getCompMembers.fulfilled, (state, action) => {
      // console.log(
      //   "actiom in get company members succes",
      //   action.payload.data.data.Members
      // );
      const data = action.payload.data.data.Members;
      state.localCompanyData = data;
    });
    builder.addCase(getCompMembers.rejected, (state, action) => {
      //  console.log("rejected company members");
    });
  },
});

export default companyMemberSlice.reducer;
