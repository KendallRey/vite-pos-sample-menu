import { PayloadAction } from "@reduxjs/toolkit";
import { REDUX } from "../constant/redux";
import { clearDataArrayOf } from "@/model/helper/data";
import { IModel } from "@/model/schema";
import { any } from "zod";

export const setAction = <T extends Record<string, any>, D = any>(field: keyof T) => {
  return (state: T, action: PayloadAction<D>) => {
    state[field] = action.payload as T[keyof T];
  };
};

export const clearAction = <T extends Record<string, any>>(field: keyof T) => {
  return (state: T) => {
    state[field] = undefined as T[keyof T];
  };
};

export const viewActions = <T extends string, D extends Record<string, any>>(INITIAL_STATE: D) => {
  const setView = (state: Record<string, any>, action: PayloadAction<{ view: T; open: boolean }>) => {
    const { payload } = action;
    const { view, open } = payload;
    state[view] = open;
  };
  const resetViews = (state: Record<string, any>) => {
    state = INITIAL_STATE;
  };

  return {
    setView,
    resetViews,
  };
};

export const setFormAction = <T>(state: IReduxFormState<T>, action: PayloadAction<Record<string, any>>) => {
  const { payload } = action;
  return { ...state, ...payload, error: {} };
};

export const editFormAction = <T>(state: IReduxFormState<T>, action: PayloadAction<Record<string, any>>) => {
  const { payload } = action;
  const error = { ...state.error, [payload[REDUX.FIELD.KEY]]: "" };
  return { ...state, error, ...payload };
};

export const setFormErrorAction = <T>(state: IReduxFormState<T>, action: PayloadAction<Record<string, any>>) => {
  const { payload } = action;
  state.error = payload as any;
};

export const clearFormErrorAction = <T>(state: IReduxFormState<T>) => {
  state.error = {};
};

/**
 * Set array of object to object array field.
 * @param field Object array field name.
 */
export const setArrayAction = <T extends Record<string, any>>(field: keyof T) => {
  return (state: T, action: PayloadAction<IModel[]>) => {
    const { payload } = action;
    state[field] = payload as T[keyof T];
  };
};

/**
 * Adds/Selects or Removes/unselects object to list.
 * @note Object to add / remove must have `id` field
 * @param  field Array field name.
 */
export const selectItemAction = <T extends Record<string, any>, D extends IModel>(field: keyof T) => {
  return (state: T, action: PayloadAction<{ item: D; select?: boolean }>) => {
    const { payload } = action;
    const { item, select } = payload;
    if (select) {
      const cleanList = clearDataArrayOf(state[field], [item]);
      cleanList.push(item);
      state[field] = cleanList as T[keyof T];
    } else {
      const cleanList = clearDataArrayOf(state[field], [item]);
      state[field] = cleanList as T[keyof T];
    }
  };
};

export const toggleFieldAction = <T extends Record<string, any>, U = any, V = any>(
  field: keyof T,
  defaultValue: U,
  toggledValue: V,
) => {
  const toggleAction = (state: T) => {
    state[field] = (state[field] === toggledValue ? defaultValue : toggledValue) as T[keyof T];
  };
  return toggleAction;
};
