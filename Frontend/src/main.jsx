import { CssBaseline } from "@mui/material";
import { StyledEngineProvider } from "@mui/system";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Routes from "./Routes/Routes.jsx";
import "./assets/scss/style.scss";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ConfirmProvider } from "material-ui-confirm";
import AuthenticationRoutes from "./Routes/AuthenticationRoutes.jsx";
import { MeetProvider } from "./contexts/MeetContext.jsx";
import { MenuContextProvider } from "./contexts/MenuContextProvider.jsx";
import { MessageProvider } from "./contexts/MesageContext";
import { ThemeContextProvider } from "./contexts/ThemeContextProvider.jsx";
import MainRoutes from "./routes/MainRoutes.jsx";
const App = createBrowserRouter([MainRoutes, AuthenticationRoutes]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MeetProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledEngineProvider injectFirst>
          <MenuContextProvider>
            <ThemeContextProvider>
              <MessageProvider>
                <ConfirmProvider
                  defaultOptions={{
                    confirmationButtonProps: {
                      color: "success",
                      autoFocus: true,
                    },
                    cancellationButtonProps: { color: "error" },
                  }}
                >
                  <CssBaseline />
                  <RouterProvider router={App} />
                </ConfirmProvider>
              </MessageProvider>
            </ThemeContextProvider>
          </MenuContextProvider>
        </StyledEngineProvider>
      </LocalizationProvider>
    </MeetProvider>
  </React.StrictMode>
);
