import { MuiTheme } from "@/components/theme/theme";
import { store } from "@/redux/services/store";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";

type IProviders = {
  children: React.ReactNode;
};

const Providers: React.FC<IProviders> = ({ children }) => {
  return (
    <SnackbarProvider>
      <Provider store={store}>
        <ThemeProvider theme={MuiTheme}>{children}</ThemeProvider>
      </Provider>
    </SnackbarProvider>
  );
};

export default Providers;
