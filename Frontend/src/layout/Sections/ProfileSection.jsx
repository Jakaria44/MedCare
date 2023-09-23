import { useEffect, useRef, useState } from "react";

// import { useSelector } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import { Link, useNavigate } from "react-router-dom";

// material-ui
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  Grow,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
// third-party

// project imports
import MainCard from "./../../ui-component/cards/MainCard";

// assets

import { Login, Logout, PersonAddAlt } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import ErrorModal from "../../component/ErrorModal";
import SuccessfulModal from "../../component/SuccessfulModal";
import TextArea from "../../component/TextArea";

// ==============================|| PROFILE MENU ||============================== //
const ProfileSection = () => {
  const theme = useTheme();
  const confirm = useConfirm();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showingNewsModal, setShowingNewsModal] = useState(false);
  // const [showingResignModal, setShowingResignModal] = useState(false);
  const [news, setNews] = useState("");
  const navigate = useNavigate();
  //   const customization = useSelector((state) => state.customization);
  // const [name, setName] = useState();
  const name = localStorage.getItem("name");
  // const [image, setImage] = useState(null);
  const image = localStorage.getItem("image");

  const [sdm, setSdm] = useState(true);
  const [value, setValue] = useState("");
  const [notification, setNotification] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const handleLogout = () => {
    // localStorage.clear();
    const mode = localStorage.getItem("colorMode");
    localStorage.clear();
    localStorage.setItem("colorMode", mode);

    navigate("/signin");
  };

  const handleClose = (event) => {
    if (
      (anchorRef.current && anchorRef.current.contains(event.target)) ||
      showingNewsModal
    ) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = "") => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== "") {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.background,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.background.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.textDark,
            "& svg": {
              stroke: theme.palette.primary.light,
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={image ? image : <PersonAddAlt />}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: "8px 0 8px 8px !important",
              cursor: "pointer",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <SettingsIcon
            stroke={1.5}
            size="1.5rem"
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Grow
            style={{
              transformOrigin: "top right", // Set the transform origin to top right
            }}
            in={open}
            {...TransitionProps}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">WELCOME,</Typography>
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{ fontWeight: 400 }}
                        >
                          {name || "GUEST"}
                        </Typography>
                      </Stack>
                      <Typography my={2} variant="body1">
                        {localStorage.getItem("role")?.toUpperCase() ||
                          "Please Sign In"}
                      </Typography>
                    </Stack>

                    <Divider />
                  </Box>

                  <Box sx={{ p: 2 }}>
                    <List
                      component="nav"
                      sx={{
                        width: "100%",
                        maxWidth: 350,
                        minWidth: 300,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "10px",
                        [theme.breakpoints.down("md")]: {
                          minWidth: "100%",
                        },
                        "& .MuiListItemButton-root": {
                          mt: 0.5,
                        },
                      }}
                    >
                      {name && (
                        <ListItemButton
                          sx={{
                            borderRadius: "12px",
                          }}
                          selected={selectedIndex === 0}
                          component={Link}
                          to="/profile"
                        >
                          <ListItemIcon>
                            <SettingsIcon fontSize="medium" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" color="inherit">
                                My Account
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      )}
                      <ListItemButton
                        sx={{
                          borderRadius: "12px",
                        }}
                        selected={selectedIndex === 4}
                        onClick={() => {
                          if (name) {
                            handleLogout();
                          } else {
                            navigate("/signin");
                          }
                        }}
                      >
                        <ListItemIcon>
                          {name ? (
                            <Logout stroke={1.5} size="1.3rem" />
                          ) : (
                            <Login stroke={1.5} size="1.3rem" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2" color="inherit">
                              {name ? "Sign out" : "Sign in"}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </List>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <TextArea
        open={showingNewsModal}
        limit={2000}
        handleClose={(event) => {
          setShowingNewsModal(false);
        }}
        handleSubmit={() => {
          submitNews();
        }}
        rows={4}
        setValue={setNews}
        title="Publish News"
        buttonText="Publish"
      />

      <SuccessfulModal
        showSuccessMessage={showSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => {
          setShowSuccessMessage(false);
          setShowingNewsModal(false);
          // setShowingResignModal(false);
        }}
      />
      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => {
          setShowErrorMessage(false);
          setShowingNewsModal(false);
          // setShowingResignModal(false);
        }}
      />
    </>
  );
};

export default ProfileSection;
