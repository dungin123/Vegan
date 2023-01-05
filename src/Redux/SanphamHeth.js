import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAllHethang,

} from "../API/StatisticalApi";
export const getsanphamHethang = createAsyncThunk(
  "hethang/getsanphamHethang",
  async () => {
    const { data: getexport } = await getAllHethang();
    return getexport.totalItems;
  }
);
const sanphaHethang = createSlice({
  name: "auth",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getsanphamHethang.fulfilled, (state, action) => {
      state.value = action.payload;
      // action is inferred correctly here if using TS
    });
  },
});

export const { loginStart, loginSuccess, loginFailed } = sanphaHethang.actions;

export default sanphaHethang.reducer;
