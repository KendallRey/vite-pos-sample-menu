import { TextField, TextFieldProps, alpha, styled } from "@mui/material";

export type IMuiTextField = {
  errorText?: string;
} & TextFieldProps;

const DEFAULT_PROPS: TextFieldProps = {
  size: "small",
  variant: "filled",
};

export const CustomMuiTextField = styled((props: IMuiTextField) => (
  <TextField
    {...props}
    {...DEFAULT_PROPS}
    InputProps={{
      disableUnderline: true,
      ...props.InputProps,
    }}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: "#FFF",
    border: "1px solid",
    borderColor: theme.palette.grey[500],
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
}));

const MuiTextField: React.FC<IMuiTextField> = (props) => {
  const { errorText, ...otherProps } = props;
  return <CustomMuiTextField {...DEFAULT_PROPS} error={Boolean(errorText)} helperText={errorText} {...otherProps} />;
};

export default MuiTextField;
