import { createSlice } from "@reduxjs/toolkit";
import { REDUX_SLICE } from "../constant/slice";
import {
  setFormAction,
  editFormAction,
  setFormErrorAction,
  clearFormErrorAction,
  selectItemAction,
  setArrayAction,
  toggleFieldAction,
} from "@/redux/helper/action";
import { ICategory } from "@/model/category";
import { IMenuItemFormSchema } from "@/model/menu";

type IMenuItemFormState = IReduxFormState<IMenuItemFormSchema>;

const INITIAL_STATE: IMenuItemFormState = {
  error: {},
  categories: [],
};

const menuItemFormSlice = createSlice({
  name: REDUX_SLICE.MENU_ITEM_FORM,
  initialState: INITIAL_STATE,
  reducers: {
    setMenuItemForm: setFormAction<IMenuItemFormSchema>,
    editMenuItemForm: editFormAction<IMenuItemFormSchema>,
    setMenuItemFormError: setFormErrorAction<IMenuItemFormSchema>,
    setMenuItemCategories: setArrayAction<IMenuItemFormState>("categories"),
    selectMenuItemCategory: selectItemAction<IMenuItemFormState, ICategory>("categories"),
    toggleMenuItemSmallPrice: toggleFieldAction("small_price", undefined, null),
    toggleMenuItemLargePrice: toggleFieldAction("large_price", undefined, null),
    clearMenuItemFormError: clearFormErrorAction,
    clearMenuItemForm: () => INITIAL_STATE,
  },
});

export const {
  setMenuItemForm,
  editMenuItemForm,
  setMenuItemCategories,
  selectMenuItemCategory,
  setMenuItemFormError,
  clearMenuItemFormError,
  toggleMenuItemLargePrice,
  toggleMenuItemSmallPrice,
  clearMenuItemForm,
} = menuItemFormSlice.actions;
export default menuItemFormSlice.reducer;
