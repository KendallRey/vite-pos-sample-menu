import { combineReducers, configureStore } from "@reduxjs/toolkit/react";
import sampleSlice from "../features/sample/sampleSlice";
import menuItemFormSlice from "../features/menu/menuItemFormSlice";
import categoryFormSlice from "../features/category/categoryFormSlice";
import formDialogsSlice from "../features/form-dialogs/formDialogsSlice";

const rootReducer = combineReducers({
  sample: sampleSlice,
  menuItemForm: menuItemFormSlice,
  categoryForm: categoryFormSlice,
  formDialogs: formDialogsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.MODE !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
