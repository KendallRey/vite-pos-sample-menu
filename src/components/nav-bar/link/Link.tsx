import { Link, LinkProps, Typography, styled } from "@mui/material";

type CustomLinkProps = {
  icon?: React.ReactNode;
  active?: boolean;
} & LinkProps;

const StyledLink = styled(Link)<{ active?: string }>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: theme.spacing(2),
  textDecoration: "none",
}));

type IMuiLink = CustomLinkProps;

const MuiLink: React.FC<IMuiLink> = (props) => {
  const { active, icon: Icon, children, ...otherProps } = props;
  return (
    <StyledLink active={active ? "true" : undefined} {...otherProps}>
      {Icon}
      <Typography fontWeight={600} fontSize={18}>
        {children}
      </Typography>
    </StyledLink>
  );
};

export default MuiLink;
