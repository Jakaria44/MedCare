import { CameraAlt } from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { firebaseDB as db } from "../meeting/MeetWebRTC";
import server from "./../../HTTP/imageUpload";

const defaultAmbulancePicture =
  "http://res.cloudinary.com/daa9vvvey/image/upload/v1694966290/esjbmgg6ccmbypi5yhn3.jpg";
const defaultAmbulance = {
  driver: localStorage.getItem("name"),
  image: "",
  contact: "",
  available: true,
  ac: false,
};
const AddAmbulance = ({ ambulanceProp, editing = false, open, close }) => {
  const [ambulance, setAmbulance] = useState(null);
  const [validNum, setValidNum] = useState(true);

  const [selectedImage, setSelectedImage] = useState();
  const [previewUrl, setPreviewUrl] = useState(defaultAmbulancePicture);
  useEffect(() => {
    if (!ambulanceProp) {
      setAmbulance(defaultAmbulance);
      setPreviewUrl(defaultAmbulancePicture);
    } else {
      setPreviewUrl(ambulanceProp?.image);
      setAmbulance(ambulanceProp);
    }
  }, [ambulanceProp]);

  const [uploading, setUploading] = useState(false);

  const handleImageSelect = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setSelectedImage(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleChange = (field, value) => {
    setAmbulance((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const submitHandler = async () => {
    setUploading(true);
    let url = defaultAmbulancePicture;
    if (selectedImage) {
      try {
        url = await uploadImage(selectedImage);
      } catch (err) {
        console.log(err);
      }
    }
    console.log(ambulance, url);
    try {
      db.ref(`details/${localStorage.getItem("user_id")}`).set({
        ac: ambulance.ac,
        contact: ambulance.contact,
        driver: ambulance.driver,
        image: url,
      });

      if ("geolocation" in navigator) {
        // Get the user's current position
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const { latitude, longitude } = position.coords;

            db.ref(`ambulances/${localStorage.getItem("user_id")}`).set({
              available: ambulance.available,
              latitude: latitude,
              longitude: longitude,
            });
          },
          function (error) {
            // Handle any errors that occur during geolocation
            console.error("Error getting geolocation:", error.message);
          }
        );
      } else {
        // Geolocation is not available in this browser
        console.error("Geolocation is not supported in this browser.");
      }
    } catch (err) {
      console.log(err);
    } finally {
      // setAmbulance(defaultAmbulance);
      setUploading(false);
      close();
    }
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      console.log(formData);

      const response = await server.post("/api/v1/upload/upload", formData);

      console.log(response);
      const url = response.data.url;
      return url;
    } catch (err) {
      console.log(err);
    }
  };
  const handleNumberChange = (value) => {
    const isValid = matchIsValidTel(value);
    setValidNum(isValid);
    setAmbulance((prevProfile) => ({
      ...prevProfile,
      contact: value,
    }));
  };
  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") return;
        close();
      }}
      component="form"
      noValidate={false}
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler();
      }}
      fullWidth
    >
      <Box p={2}>
        <Typography variant="h2" textAlign="center" gutterBottom>
          Add Your Ambulance
        </Typography>
        <Divider />

        <Stack m={2} spacing={2}>
          <Grid container direction="row" justifyContent="center">
            <Grid item>
              {previewUrl && (
                <Avatar
                  variant="square"
                  alt="Preview"
                  src={previewUrl}
                  sx={{ width: 380, height: 170 }}
                />
              )}
            </Grid>
            <Grid item mt={18} ml={2}>
              <IconButton
                alignContents="right"
                variant="contained"
                color="primary"
                component="label"
              >
                <CameraAlt />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: "none" }}
                />
              </IconButton>
            </Grid>
          </Grid>

          <TextField
            required
            label="Driver Name"
            fullWidth
            value={ambulance?.driver}
            onChange={(e) => handleChange("driver", e.target.value)}
          />

          {/* <TextField
            required
            label="Contact No"
            fullWidth
            value={ambulance?.contact}
            onChange={(e) => handleChange("contact", e.target.value)}
          /> */}
          <MuiTelInput
            color={validNum ? "info" : "error"}
            disableDropdown
            defaultCountry="BD"
            onChange={handleNumberChange}
            value={ambulance?.contact}
            fullWidth
            label="Contact No"
            required
            error={!validNum}
            helperText={!validNum ? "Invalid Number" : ""}
          />
          <Stack direction="row" spacing={2}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => handleChange("ac", e.target.checked)}
                  checked={ambulance?.ac}
                />
              }
              label="Air Condition"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => handleChange("available", e.target.checked)}
                  checked={ambulance?.available}
                />
              }
              label="Available"
              labelPlacement="end"
            />
          </Stack>
        </Stack>
      </Box>
      <DialogActions>
        <Button color="error" onClick={close}>
          Cancel
        </Button>
        <Button color="success" variant="contained" type="submit">
          {editing ? "Update" : "Add"}
        </Button>
      </DialogActions>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={uploading}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress />
          <Typography variant="h4">Uploading...</Typography>
        </Box>
      </Backdrop>
    </Dialog>
  );
};

export default AddAmbulance;
