// material-ui
import { Avatar, Box, ButtonBase, Link, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import DarkModeSwitch from "../component/DarkModeSwitch.jsx";
import { useMyTheme } from "../contexts/ThemeContextProvider.jsx";
import ProfileSection from "./Sections/ProfileSection.jsx";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  const mode = useMyTheme();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: "flex",

          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <ButtonBase disableRipple>
          <Avatar
            onClick={handleLeftDrawerToggle}
            variant="circular"
            // sx={{
            //   ...theme.typography.commonAvatar,
            //   ...theme.typography.mediumAvatar,
            // }}
          >
            <MenuRoundedIcon
              // onClick={handleLeftDrawerToggle}
              fontSize="medium"
            />
          </Avatar>
        </ButtonBase>
        <Box component="span" marginLeft="16px" sx={{ flexGrow: 1 }}>
          <Typography component="div" my={2}>
            <Link
              href="/"
              color="text.primary"
              variant="h2"
              sx={{ textDecoration: "none" }}
              fontFamily="cursive"
            >
              MedCare
            </Link>
          </Typography>
        </Box>
      </Box>

      {/* header search */}
      {/* <SearchSection /> */}
      <Box sx={{ flexGrow: 14 }} />

      {/* notification & profile */}
      <Box>
        {/* <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
          }}
          onClick={() => {
            dispatch({
              type: actions.TOGGLE_THEME,
            });
          }}
        >
          {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
        </Avatar> */}
        <DarkModeSwitch />
      </Box>
      {/* <Notification /> */}
      <Box sx={{ flexGrow: 1 }} />

      <ProfileSection />
    </>
  );
};

export default Header;
