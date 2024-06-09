import { Button, ButtonProps } from "@mui/material";

type IMuiButton = ButtonProps;

const DEFAULT_PROPS: ButtonProps = {
  sx: {
    textTransform: "none",
  },
};

const MuiButton: React.FC<IMuiButton> = (props) => {
  const { sx, ...otherProps } = props;
  const _sx = { ...sx, ...DEFAULT_PROPS.sx };
  return <Button {...DEFAULT_PROPS} sx={_sx} {...otherProps} />;
};

export default MuiButton;
