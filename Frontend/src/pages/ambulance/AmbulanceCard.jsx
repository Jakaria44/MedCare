import { Delete, Edit, MoreVert } from "@mui/icons-material";
import {
  Card,
  CardContent,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import React, { useRef, useState } from "react";
import ErrorModal from "../../component/ErrorModal";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import SuccessfulModal from "../../component/SuccessfulModal";
import server from "./../../HTTP/httpCommonParam";
import AddNewAmbulance from "./AddNewAmbulance";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
const MyTypography = ({ children, ...other }) => (
  <Typography
    gutterBottom
    variant="body2"
    fontSize={15}
    component="div"
    color="text.primary"
    sx={{ maxHeight: 48 }}
    noWrap
    {...other}
  >
    {children}
  </Typography>
);

const AmbulanceCard = ({ load, ambulance }) => {
  const confirm = useConfirm();
  const [editingAmbulance, setEditingAmbulance] = useState(false); // [editingAmbulance, setEditingAmbulance
  const [successMessage, setSuccessMessage] = useState("success");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("An Error Occured");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const ref = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  // console.log(book);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isMyPost = localStorage.getItem("user_id") == ambulance.userId;

  const deleteAmbulance = async () => {
    try {
      await confirm({
        title: "Delete Ambulace",
        description: "Are you sure you want to delete this Ambulance?",
        confirmationText: "Delete",
        cancellationText: "Cancel",
        confirmationButtonProps: { variant: "outlined", color: "error" },
        cancellationButtonProps: { variant: "contained", color: "error" },
      });
      try {
        const res = await server.delete(
          `/protect/deleteambulancePost/${ambulance.id}`
        );
        setSuccessMessage(res.data.message);
        setShowSuccessMessage(true);
        load();
      } catch (err) {
        setErrorMessage(err.response.data.message);
        setShowErrorMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const editAmbulance = () => {
    setEditingAmbulance(true);
  };
  return (
    <>
      <Card
        raised
        sx={{ width: { xs: "100%" } }}
        elevation={12}
        onMouseLeave={() => setHovered(false)}
      >
        <ImageListItem cols={1} rows={2}>
          <img
            onMouseEnter={() => setHovered(true)}
            style={{ height: 160, width: "100%" }}
            src={ambulance.ambulanceImageName}
            alt={ambulance.ambulanceModel}
            loading="lazy"
          />
          {isMyPost && (
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, " +
                  "rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%)",
              }}
              // title={book.TITLE}
              position="top"
              actionIcon={
                <Tooltip title="Options">
                  <IconButton
                    m={0}
                    onClick={handleClick}
                    center
                    size="large"
                    sx={{ background: "rgba(90,90,90,0.5)" }}
                  >
                    <MoreVert />
                  </IconButton>
                </Tooltip>
              }
              actionPosition="right"
            />
          )}
        </ImageListItem>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={editAmbulance} disableRipple>
            <Edit />
            Edit
          </MenuItem>
          <MenuItem onClick={deleteAmbulance} disableRipple>
            <Delete color="error" />
            Delete
          </MenuItem>
        </StyledMenu>
        <CardContent marginBottom="0px">
          <Tooltip title={ambulance.ambulanceModel}>
            <MyTypography>Model: {ambulance.ambulanceModel}</MyTypography>
          </Tooltip>

          <MyTypography>
            AirConditioned: {ambulance.aircon ? "Yes" : "No"}
          </MyTypography>
          <Tooltip title={ambulance.driverName}>
            <MyTypography>Driver: {ambulance.driverName}</MyTypography>
          </Tooltip>
          <MyTypography> Division : {ambulance.division}</MyTypography>
          <MyTypography> District : {ambulance.district}</MyTypography>
          <MyTypography> Upazilla : {ambulance.upazila}</MyTypography>
          <MyTypography>Driver Contact: {ambulance.contactInfo}</MyTypography>
        </CardContent>
      </Card>

      <SuccessfulModal
        showSuccessMessage={showSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => {
          setShowSuccessMessage(false);
        }}
      />
      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => {
          setShowErrorMessage(false);
        }}
      />
      <AddNewAmbulance
        ambulanceProp={ambulance}
        editing={true}
        open={editingAmbulance}
        close={() => {
          setEditingAmbulance(false);
          load();
        }}
      />

      <SpinnerWithBackdrop backdropOpen={loading} helperText="Please Wait" />
    </>
  );
};

export default AmbulanceCard;
