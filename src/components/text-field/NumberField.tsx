import { OutlinedInputProps, TextFieldProps } from "@mui/material";
import { NumberFormatValues, NumericFormatProps } from "react-number-format/types/types";
import MuiTextField, { CustomMuiTextField, IMuiTextField } from "./TextField";
import { formatToId } from "../helper/component";
import { forwardRef, useCallback } from "react";
import { MONEY } from "@/constant/config";
import { NumericFormat } from "react-number-format";

export type ICustomNumericFormatProps = {
  min?: number;
  max?: number;
};

export type INumericFormatProps = {
  onChange: (event: { target: { name: string; value: any; type: string } }) => void;
  name: string;
} & Omit<NumericFormatProps, "onChange"> &
  ICustomNumericFormatProps;

export const NumericFormatCustom = forwardRef<HTMLInputElement, INumericFormatProps>((props, ref) => {
  const { onChange, min, max, name, ...other } = props;

  const handleValueChange = useCallback(
    (values: { value?: string }) => {
      onChange({
        target: {
          name: name,
          value: values.value !== undefined ? Number(values.value) : undefined,
          type: "number",
        },
      });
    },
    [onChange, name],
  );

  const handleIsAllowed = useCallback(
    (values: NumberFormatValues) => {
      const { floatValue } = values;
      if (!floatValue) {
        handleValueChange({ value: "0" });
        return false;
      }
      if (max !== undefined && floatValue >= max) {
        handleValueChange({ value: String(max) });
        return false;
      }
      if (min !== undefined && floatValue <= min) {
        handleValueChange({ value: String(min) });
        return false;
      }
      if (floatValue >= MONEY.LIMIT.MAX) {
        handleValueChange({ value: String(MONEY.LIMIT.MAX) });
        return false;
      }
      if (floatValue <= MONEY.LIMIT.MIN) {
        handleValueChange({ value: String(MONEY.LIMIT.MIN) });
        return false;
      }
      return true;
    },
    [min, max, handleValueChange],
  );

  return <NumericFormat {...other} getInputRef={ref} onValueChange={handleValueChange} isAllowed={handleIsAllowed} />;
});

NumericFormatCustom.displayName = "NumericFormatCustom";

type IMuiNumberField = {
  label: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  numericProps?: Omit<NumericFormatProps, "onChange">;
} & Omit<IMuiTextField, "onChange"> &
  ICustomNumericFormatProps;

export const MuiNumberField: React.FC<IMuiNumberField> = (props) => {
  const { label, id, name, value, onChange, min, max, numericProps, ...otherProps } = props;

  const _id = formatToId(id || String(label));

  return (
    <MuiTextField
      id={_id}
      name={name || _id}
      label={label}
      value={value}
      onChange={onChange}
      {...otherProps}
      InputProps={
        {
          disableUnderline: true,
          inputComponent: NumericFormatCustom as unknown,
          inputProps: {
            onChange: onChange,
            name: name || _id,
            value: value,
            ...numericProps,
            min: min,
            max: max,
          },
        } as Partial<OutlinedInputProps>
      }
    />
  );
};