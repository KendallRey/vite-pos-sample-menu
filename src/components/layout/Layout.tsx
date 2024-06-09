import { Outlet } from "react-router-dom";
import AuthNavbar from "../nav-bar/AuthNavbar";
import MainContainer from "../container/Main";
import AuthHeader from "../header/AuthHeader";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MuiTheme } from "../theme/theme";

const Layout = () => {
  const fullScreen = useMediaQuery(MuiTheme.breakpoints.down("md"));

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 gap-5">
      <AuthHeader />

      <div className="flex flex-grow justify-center px-2">
        {!fullScreen && <AuthNavbar />}

        <MainContainer>
          <Outlet />
        </MainContainer>
      </div>

      <footer className="bg-gray-300 text-white p-4">
        <div className="container mx-auto">
          <p>&copy; 2024 My Website</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
