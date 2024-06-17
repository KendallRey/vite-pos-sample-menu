import { IMethod, METHOD } from "@/constant/method";
import { REDUX } from "@/redux/constant/redux";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import { SafeParseError } from "zod";
import { IModel } from "../schema";
import moment from "moment";
import { DATE } from "@/constant/config";

type IData = Record<string, unknown>;

export const transformData = (data: IData, method: IMethod): Partial<unknown> => {
  let infoData: IData = {};

  switch (method) {
    case METHOD.POST:
      infoData = {
        ...infoData,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        deleted_at: null,
        archived: false,
      };
      break;
    case METHOD.PUT:
      infoData = {
        updated_at: serverTimestamp(),
      };
      break;
    case METHOD.DELETE:
      infoData = {
        deleted_at: serverTimestamp(),
        archived: true,
      };
      break;
  }

  const { [REDUX.FIELD.KEY]: lastKey, ...cleanData } = data;

  return {
    ...cleanData,
    ...infoData,
  };
};

export const parseData = <T = any>(data: IData) => {
  const infoData = {
    created_at: Boolean(data.created_at) ? timestampToDate(data.created_at) : null,
    updated_at: Boolean(data.updated_at) ? timestampToDate(data.updated_at) : null,
    deleted_at: Boolean(data.deleted_at) ? timestampToDate(data.deleted_at) : null,
  };
  return {
    ...data,
    ...infoData,
  } as T;
};

export const getCleanFormData = (data: IData) => {
  const { created_at, updated_at, deleted_at, archived, ...cleanData } = data;
  return cleanData;
};

export const timestampToDate = (data: unknown) => {
  if (data instanceof Timestamp) return moment(data.toDate()).format(DATE.FORMAT.FULL);
  return null;
};

export const getValidationErrors = <T>(result: SafeParseError<T>) => {
  const newErrors: Partial<Record<string, string>> = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      issue.path.forEach((path) => (newErrors[path] = issue.message));
    });
  }
  return newErrors;
};

/**
 * Returns array of ID.
 * @param {Array<string>} list List of Data with `id`.
 * @returns {Array<string>} An array of IDs.
 */
export const toIdsOfDataArray = <T extends IModel>(list: T[]): Array<string> => {
  return list.map((item) => item.id);
};

/**
 * Returns an array of objects by subtracting the array `toClear` from the array `list`.
 * @param  {Array<IModel>} list - The original list of objects with `id` properties.
 * @param  {Array<IModel>} toClear - The list of objects with `id` properties to be subtracted from the original list.
 * @returns {Array<IModel>} An array of objects.
 */
export const clearDataArrayOf = <T extends IModel>(list: T[], toClear: T[]): Array<IModel> => {
  const ids = toIdsOfDataArray(toClear);
  return list.filter((item) => !ids.includes(item.id));
};

/**
 * Returns an array of objects by array of IDs.
 * @param  {Array<IModel>} list - The original list of objects with `id` properties.
 * @param  {Array<IModel>} ids - The list of `id` to be selected from the original list.
 * @returns {Array<IModel>} An array of objects.
 */
export const selectDataArrayOfByIDs = <T extends IModel>(list: T[] | undefined, ids: string[]): Array<T> => {
  if (!list) return [];
  return list.filter((item) => ids.includes(item.id));
};

/**
 * Extracts the values of a specific field from an array of objects.
 * @param list - Array of objects.
 * @param field - The key of the field to extract values from.
 * @returns An array of values corresponding to the specified field.
 */
export const extractFieldValues = <T extends Record<string, any>, K extends keyof T>(
  list: T[] | undefined,
  field: K,
): T[K][] => {
  if (!list) return [];
  return list.map((item) => item[field]);
};
