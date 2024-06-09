import { Container, ContainerProps } from "@mui/material";
import React from "react";

type IMainContainer = ContainerProps;

const MainContainer: React.FC<IMainContainer> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <Container
      className="p-4 flex-grow bg-white rounded-lg"
      {...otherProps}
      sx={{
        margin: 0,
        maxWidth: 1440,
      }}
    >
      {children}
    </Container>
  );
};

export default MainContainer;
