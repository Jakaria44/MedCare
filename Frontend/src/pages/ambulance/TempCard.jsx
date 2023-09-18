import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  ImageListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import React, { useRef, useState } from "react";
import ErrorModal from "../../component/ErrorModal";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import SuccessfulModal from "../../component/SuccessfulModal";
import server from "./../../HTTP/httpCommonParam";
import AddNewAmbulance from "./AddNewAmbulance";

const MyTypography = ({ children, ...other }) => (
  <Typography
    gutterBottom
    variant="body2"
    fontSize={15}
    component="div"
    color="text.primary"
    sx={{ maxHeight: 48 }}
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
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        raised
        sx={{ width: { xs: "100%" } }}
        elevation={12}
      >
        <ImageListItem cols={1} rows={2}>
          <img
            sx={{ height: 180, width: "100%", margin: "auto" }}
            src={ambulance.ambulanceImageName}
            alt={ambulance.ambulanceModel}
            loading="lazy"
          />
        </ImageListItem>

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
        <Backdrop
          ref={ref}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isMyPost && isHovered}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button onClick={editAmbulance}>Edit Info</Button>
            <Button onClick={deleteAmbulance}>Delete</Button>
          </Box>
        </Backdrop>
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
