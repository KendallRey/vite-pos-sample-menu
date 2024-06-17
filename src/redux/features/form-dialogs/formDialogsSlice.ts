import { createSlice } from "@reduxjs/toolkit";
import { REDUX_SLICE } from "../constant/slice";
import { ICategory } from "@/model/category";
import { viewActions, setAction, clearAction } from "@/redux/helper/action";

type IDialog = "create_menu_item" | "create_category";

type ICreateForms = Record<IDialog, boolean>;

type IDataToModify = {
  categoryToUpdate: ICategory;
  categoryToDelete: ICategory;
};

type IFormDialogsState = Partial<ICreateForms & IDataToModify>;

const INITIAL_STATE: IFormDialogsState = {};

const formDialogsSlice = createSlice({
  name: REDUX_SLICE.FORM_DIALOGS,
  initialState: INITIAL_STATE,
  reducers: {
    ...viewActions<IDialog, IFormDialogsState>(INITIAL_STATE),
    setCategoryToUpdate: setAction<IFormDialogsState, ICategory>("categoryToUpdate"),
    clearCategoryToUpdate: clearAction("categoryToUpdate"),
    setCategoryToDelete: setAction<IFormDialogsState, ICategory>("categoryToDelete"),
    clearCategoryToDelete: clearAction("categoryToDelete"),
  },
});

export const {
  setView,
  resetViews,
  setCategoryToUpdate,
  clearCategoryToUpdate,
  setCategoryToDelete,
  clearCategoryToDelete,
} = formDialogsSlice.actions;
export default formDialogsSlice.reducer;
