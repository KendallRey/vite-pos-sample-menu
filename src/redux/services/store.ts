import { combineReducers, configureStore } from "@reduxjs/toolkit/react";
import sampleSlice from "../features/sample/sampleSlice";

const rootReducer = combineReducers({
  sample: sampleSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.MODE !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
