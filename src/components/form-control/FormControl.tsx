import { FormControl, InputLabel, FormControlProps, styled, alpha } from "@mui/material";

export type IMuiFormControl = {
  label?: string;
} & FormControlProps;

const DEFAULT_PROPS: FormControlProps = {
  size: "small",
  variant: "filled",
};

export const CustomMuiFormControl = styled((props: IMuiFormControl) => <FormControl {...props} {...DEFAULT_PROPS} />)(
  ({ theme }) => ({
    "& .MuiFilledInput-root": {
      overflow: "hidden",
      borderRadius: 8,
      backgroundColor: "#FFF",
      border: "none",
      borderColor: "#000",
      transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
      "&:hover": {
        backgroundColor: "transparent",
        boxShadow: `${alpha(theme.palette.primary.light, 0.5)} 0 0 0 4px`,
      },
      "&.Mui-focused": {
        backgroundColor: "transparent",
        boxShadow: `${theme.palette.primary.light} 0 0 0 4px`,
        borderColor: theme.palette.primary.light,
      },
      "&.Mui-error:not(.Mui-focused)": {
        borderColor: theme.palette.error.main,
      },
    },
    "& .MuiFilledInput-input:focus": {
      backgroundColor: "transparent",
      borderRadius: 8,
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
    },
  }),
);

const MuiFormControl: React.FC<IMuiFormControl> = (props) => {
  const { label, children, ...otherProps } = props;

  return (
    <CustomMuiFormControl {...otherProps}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      {children}
    </CustomMuiFormControl>
  );
};

export default MuiFormControl;
