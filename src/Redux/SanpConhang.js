import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getConhang } from "../API/StatisticalApi";
export const getsanphamConhang = createAsyncThunk(
  "conhang/getsanphamConhang",
  async () => {
    const { data: getexport } = await getConhang();
    return getexport.totalItems;
  }
);
const sanphaConhang = createSlice({
  name: "auth",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getsanphamConhang.fulfilled, (state, action) => {
      console.log(action.payload);
      state.value = action.payload;
      // action is inferred correctly here if using TS
    });
  },
});

export const { loginStart, loginSuccess, loginFailed } = sanphaConhang.actions;

export default sanphaConhang.reducer;
