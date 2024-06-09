import { createSlice } from "@reduxjs/toolkit";
import { REDUX_SLICE } from "../constant/slice";

const sampleSlice = createSlice({
  name: REDUX_SLICE.SAMPLE,
  initialState: {},
  reducers: {},
});

export default sampleSlice.reducer;
