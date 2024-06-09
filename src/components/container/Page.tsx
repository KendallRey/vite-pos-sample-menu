import Divider from "@mui/material/Divider/Divider";
import Typography from "@mui/material/Typography/Typography";
import React from "react";

type IPage = {
  title: string;
  children?: React.ReactNode;
};

const PageContainer: React.FC<IPage> = (props) => {
  const { title, children } = props;
  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h2" fontSize={24}>
        {title}
      </Typography>
      <Divider />
      {children}
    </div>
  );
};

export default PageContainer;
