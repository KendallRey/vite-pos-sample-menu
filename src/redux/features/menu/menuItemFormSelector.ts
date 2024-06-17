import { extractFieldValues, toIdsOfDataArray } from "@/model/helper/data";
import { RootState } from "@/redux/services/store";
import { createSelector } from "@reduxjs/toolkit";

const _selectMenuItem = (state: RootState) => state.menuItemForm;

export const _selectMenuItemFormCategory = createSelector([_selectMenuItem], (form) => {
  const ids = toIdsOfDataArray(form.categories || []);
  const list = form.categories || [];
  const names = extractFieldValues(form.categories, "name");

  return {
    ids,
    list,
    names,
    value: names.join(", "),
  };
});
