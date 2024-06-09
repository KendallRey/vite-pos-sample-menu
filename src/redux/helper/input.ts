import { REDUX } from "../constant/redux";

export type InputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export type InputRecord = React.ChangeEvent<InputElement>;

type IRecord = {
  [x: string]: string | number | null | boolean;
  [REDUX.FIELD.KEY]: string;
};

/**
 * Get input data, for full input control
 * @param event - Change Event of HTML (input / textarea / select)
 * @returns Object with updated key-value pair and the latest key
 * @example
 * // For an input event with name="username" and value="john_doe"
 * ```json
 * {
 *   "username": "john_doe",
 *   "_latestKey": "username"
 * }
 * ```
 */
export const getInputRecord = (event: InputRecord): IRecord => {
  const element = event.target;
  if (element instanceof HTMLInputElement) {
    const { name, value, checked, type, multiple } = element;
    const files = element.files as FileList;

    let record: Record<string, unknown> = {};
    switch (type) {
      case "text":
        record = { [name]: value };
        break;
      case "number":
        record = { [name]: Number(value) };
        break;
      case "checkbox":
        record = { [name]: checked };
        break;
      case "email":
        record = { [name]: value.trim() === "" ? null : value };
        break;
      case "file":
        record = { [name]: multiple ? files : files[0] };
        break;
      default:
        record = { [name]: value };
    }
    return { ...record, [REDUX.FIELD.KEY]: name };
  }
  if (element instanceof HTMLTextAreaElement) {
    const { name, value } = event.target;
    return { [name]: value, [REDUX.FIELD.KEY]: name };
  }
  if (element instanceof HTMLSelectElement) {
    const { name, value } = event.target;
    return { [name]: value, [REDUX.FIELD.KEY]: name };
  }
  return { [REDUX.FIELD.KEY]: "" };
};
