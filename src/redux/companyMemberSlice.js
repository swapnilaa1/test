import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { GET_COMPONY_MEM } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";
import { toastobj } from "../utility/toastobj";

const initialState = {
  localCompanyData: [],
  isGetMemberLoading:false,
};

export const getCompMembers = createAsyncThunk("company/getCompMembers", (data) => {

    return RequestAPi.get(`${GET_COMPONY_MEM}?from=${1}&text=${data}&to=${417}`).then(
    (response) => response
  );
});
const companyMemberSlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompMembers.pending, (state) => {
      state.isGetMemberLoading=true;
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(getCompMembers.fulfilled, (state, action) => {
      state.isGetMemberLoading=false;
     
      const data = action.payload.data.data.Members;
      state.localCompanyData = data;
    });
    builder.addCase(getCompMembers.rejected, (state, action) => {
      state.isGetMemberLoading=false;
      toast.error("Something Went Wrong" , toastobj)
    });
  },
});

export default companyMemberSlice.reducer;
