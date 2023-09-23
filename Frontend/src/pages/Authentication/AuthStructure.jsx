import {
  AppBar,
  Box,
  Container,
  Link as MuiLink,
  Slide,
  Toolbar,
  Typography,
  alpha,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import DarkModeSwitch from "../../component/DarkModeSwitch";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MuiLink href="/" color="text.secondary">
        MedCare
      </MuiLink>
      {new Date().getFullYear()}
    </Typography>
  );
}
const AuthStructure = () => {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <ElevationScroll>
          <AppBar
            enableColorOnDark
            position="fixed"
            sx={{ bgcolor: alpha(theme.palette.background.default, 0.9) }}
          >
            <Toolbar sx={{ paddingY: "6px" }} disableGutters>
              <Box
                // component="span"
                // marginLeft="16px"
                marginY="0px"
                sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
              >
                {/* {theme.palette.mode == "light" ? (
                  <img
                    src="./../../public/LibraryLogo2.png"
                    alt="Book Breeze"
                    width="100"
                  />
                ) : (
                  <img
                    src="./../../public/LibraryLogo.png"
                    alt="Book Breeze"
                    width="100"
                  />
                )} */}
                <Typography
                  variant="h2"
                  fontFamily="cursive"
                  component="div"
                  my={2}
                >
                  MedCare
                </Typography>
              </Box>
              <DarkModeSwitch />
            </Toolbar>
          </AppBar>
        </ElevationScroll>
      </Box>
      <Toolbar />
      <Container>
        <Box sx={{ my: 4 }}>
          <Outlet />
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
};

export default AuthStructure;
