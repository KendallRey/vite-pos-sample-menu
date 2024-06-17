import { createSlice } from "@reduxjs/toolkit";
import { REDUX_SLICE } from "../constant/slice";
import { ICategoryFormSchema } from "@/model/category";
import { setFormAction, editFormAction, setFormErrorAction, clearFormErrorAction } from "@/redux/helper/action";

type ICategoryFormState = IReduxFormState<ICategoryFormSchema>;

const INITIAL_STATE: ICategoryFormState = {
  error: {},
};

const categoryFormSlice = createSlice({
  name: REDUX_SLICE.MENU_ITEM_FORM,
  initialState: INITIAL_STATE,
  reducers: {
    setCategoryForm: setFormAction<ICategoryFormSchema>,
    editCategoryForm: editFormAction<ICategoryFormSchema>,
    setCategoryFormError: setFormErrorAction<ICategoryFormSchema>,
    clearCategoryFormError: clearFormErrorAction,
    clearCategoryForm: () => INITIAL_STATE,
  },
});

export const { setCategoryForm, editCategoryForm, setCategoryFormError, clearCategoryFormError, clearCategoryForm } =
  categoryFormSlice.actions;
export default categoryFormSlice.reducer;
