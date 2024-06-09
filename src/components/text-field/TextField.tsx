import { TextField, TextFieldProps } from "@mui/material";

type IMuiTextField = TextFieldProps;

const MuiTextField: React.FC<IMuiTextField> = (props) => {
  return <TextField {...props} />;
};

export default MuiTextField;
