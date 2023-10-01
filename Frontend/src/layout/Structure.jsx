// material-ui
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  alpha,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useMenu } from "../contexts/MenuContextProvider.jsx";
import { actions } from "../contexts/actions.jsx";
import Header from "./Header";
// import "./chat.css";

import { firebaseDB } from "../pages/meeting/MeetWebRTC.jsx";
import RouteChangeHandler from "../utils/RouteChange.jsx";
import { drawerWidth } from "./../store/constants";
import Message from "./Message.jsx";
import Sidebar from "./Sidebar/Sidebar";
// styles
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    ...theme.typography.mainContent,
    // borderRadius: 12,
    marginTop: "64px",
    transition: theme.transitions.create(
      "margin",
      open
        ? {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }
        : {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }
    ),

    [theme.breakpoints.up("md")]: {
      marginLeft: open ? 0 : -(drawerWidth - 20),
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "10px",
      width: `calc(100% - ${drawerWidth}px)`,
      // width: "100%",
      padding: "16px",
      marginRight: "10px",
    },
    [theme.breakpoints.down("sm")]: {
      // marginLeft: "10px",
      // width: `calc(100% - ${drawerWidth}px)`,
      // marginRight: "10px",
      // marginBottom: "10px",
      margin: "10px",
      marginTop: "64px",
      width: "90%",
      padding: "16px",
      paddingTop: "2vh",
    },
  })
);

const Structure = () => {
  const theme = useTheme();
  const location = useLocation();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const { menuOpened, dispatch } = useMenu();

  const handleLeftDrawerToggle = () => {
    dispatch({ type: actions.TOGGLE_SIDE_DRAWER, id: menuOpened });
  };

  function updateLocation(latitude, longitude, available) {
    console.log(available);
    const ambulanceRef = firebaseDB.ref(
      `ambulances/${localStorage.getItem("user_id")}`
    );

    console.log(new Date().toLocaleString(), latitude, longitude);

    ambulanceRef.set({
      latitude,
      longitude,
      available,
      // timestamp: firebaseDB.ServerValue.TIMESTAMP, // Optionally, you can record a timestamp
    });
  }
  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      return;
    }

    const ambulanceRef = firebaseDB.ref(`ambulances/${userId}`);

    const handleAmbulanceUpdate = (snapshot) => {
      const ambulanceData = snapshot.val();
      console.log(ambulanceData);

      if ("geolocation" in navigator) {
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Update Firebase with the new location data
            updateLocation(
              latitude,
              longitude,
              ambulanceData?.available || false
            );
            console.log(latitude, longitude);
          },
          (error) => {
            console.error("Error getting geolocation:", error);
          }
        );

        // Clean up the geolocation watch when the component unmounts
        return () => {
          navigator.geolocation.clearWatch(watchId);
        };
      } else {
        console.log("Geolocation is not available in this browser.");
      }
    };

    ambulanceRef.on("value", handleAmbulanceUpdate);

    // Clean up the Firebase listener when the component unmounts
    return () => {
      ambulanceRef.off("value", handleAmbulanceUpdate);
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <RouteChangeHandler />
      {/* header */}
      <AppBar
        enableColorOnDark
        elevation={0}
        sx={{
          bgcolor: alpha(theme.palette.background.default, 0.9),
          transition: menuOpened.opened
            ? theme.transitions.create("width")
            : "none",
        }}
      >
        {/* paddingY is responsible for appbar height */}
        <Toolbar sx={{ paddingY: "6px" }} disableGutters>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/*/!* drawer *!/*/}
      <Sidebar
        drawerOpen={!matchDownMd ? menuOpened.opened : !menuOpened.opened}
        drawerToggle={handleLeftDrawerToggle}
      />

      {/*/!* main content *!/*/}
      <Main theme={theme} open={menuOpened.opened}>
        <Outlet />
      </Main>
      {location.pathname !== "/chat" && (
        <Box
          position="fixed"
          bottom="40px"
          right="40px"
          sx={{
            zIndex: 1000,
            display: location.pathname != "/chat" ? "block" : "none",
          }}
        >
          <Message />
        </Box>
      )}
    </Box>
  );
};

export default Structure;
