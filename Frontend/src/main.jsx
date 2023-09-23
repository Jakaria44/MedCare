import { CssBaseline } from "@mui/material";
import { StyledEngineProvider } from "@mui/system";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes/Routes.jsx";
import "./assets/scss/style.scss";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ConfirmProvider } from "material-ui-confirm";
import { MeetProvider } from "./contexts/MeetContext.jsx";
import { MenuContextProvider } from "./contexts/MenuContextProvider.jsx";
import { ThemeContextProvider } from "./contexts/ThemeContextProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MeetProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledEngineProvider injectFirst>
          <MenuContextProvider>
            <ThemeContextProvider>
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

                <RouterProvider router={Routes} />
              </ConfirmProvider>
            </ThemeContextProvider>
          </MenuContextProvider>
        </StyledEngineProvider>
      </LocalizationProvider>
    </MeetProvider>
  </React.StrictMode>
);
