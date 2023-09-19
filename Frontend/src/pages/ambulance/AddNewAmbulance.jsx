import { CameraAlt } from "@mui/icons-material";
import {
  Autocomplete,
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
import React, { useMemo, useState } from "react";

import { districts } from "../../assets/bdInfo/districts";
import { divisions } from "../../assets/bdInfo/divisions";
import { upazilas } from "../../assets/bdInfo/upazilas";
import api from "./../../HTTP/httpCommonParam";
import server from "./../../HTTP/imageUpload";
const defaultAmbulancePicture =
  "http://res.cloudinary.com/daa9vvvey/image/upload/v1694966290/esjbmgg6ccmbypi5yhn3.jpg";
const defaultAmbulance = {
  driverName: "",
  ambulanceModel: "",
  ambulanceImageName: "",
  ambulanceInfo: "",
  contactInfo: "",
  division: "",
  district: "",
  upazila: "",
  aircon: false,
};
const AddNewAmbulance = ({
  ambulanceProp = defaultAmbulance,
  editing = false,
  open,
  close,
}) => {
  const [ambulance, setAmbulance] = useState(ambulanceProp);
  const [selectedImage, setSelectedImage] = useState();
  const [previewUrl, setPreviewUrl] = useState(defaultAmbulancePicture);

  // console.log(divisions);
  const [uploading, setUploading] = useState(false);
  const divOption = divisions[2].data.map((e) => ({
    id: e.id,
    name: e.name.toLowerCase(),
  }));
  const [selectedDivision, setSelectedDivision] = useState(
    divOption.filter((e) => e.name === ambulance?.division)[0] || ""
  );
  const distOption = useMemo(
    () =>
      districts[2].data
        .filter((e) => e.division_id == selectedDivision?.id)
        .map((e) => ({
          id: e.id,
          division_id: e.division_id,
          name: e.name.toLowerCase(),
        })) || [],
    [selectedDivision]
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    distOption.filter((e) => e.name === ambulance?.district)[0] || ""
  );
  const upazilaOption = useMemo(
    () =>
      upazilas[2].data
        .filter((e) => e.district_id == selectedDistrict?.id)
        .map((e) => ({
          id: e.id,
          district_id: e.district_id,
          name: e.name.toLowerCase(),
        })) || [],
    [selectedDistrict, selectedDivision]
  );

  const [selectedUpazila, setSelectedUpazila] = useState(
    upazilaOption.filter((e) => e.name === ambulance?.upazila)[0] || ""
  );
  const handleImageSelect = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // handleChange("ambulanceImageName", selectedFile);
      setSelectedImage(selectedFile);
      // console.log(selectedFile);

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
    const newAmbulance = { ...ambulance, ambulanceImageName: url };
    console.log(newAmbulance);
    try {
      let res;
      if (!editing) res = await api.post("/createAmbulancePost", newAmbulance);
      else
        res = await api.put(
          "/updateAmbulancePost/" + ambulance.id,
          newAmbulance
        );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setAmbulance(defaultAmbulance);
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
          Add new Ambulance
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
              {/* <img src="www.vecteezy.com/vector-art/21634237-ambulance-car-design-icon-logo-vector" /> */}
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
            value={ambulance.driverName}
            onChange={(e) => handleChange("driverName", e.target.value)}
          />
          <TextField
            required
            label="Ambulance Model"
            fullWidth
            value={ambulance.ambulanceModel}
            onChange={(e) => handleChange("ambulanceModel", e.target.value)}
          />

          <Stack direction="row" spacing={2}>
            <TextField
              required
              label="Contact No"
              fullWidth
              value={ambulance.contactInfo}
              onChange={(e) => handleChange("contactInfo", e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => handleChange("aircon", e.target.checked)}
                  checked={ambulance.aircon}
                />
              }
              label="Air Condition"
              labelPlacement="end"
            />
          </Stack>
          <TextField
            required
            label="Info"
            fullWidth
            value={ambulance.ambulanceInfo}
            onChange={(e) => handleChange("ambulanceInfo", e.target.value)}
          />
          <Autocomplete
            fullWidth
            options={divOption}
            id="division"
            value={selectedDivision || ""}
            autoHighlight
            getOptionLabel={(option) => option?.name || ""}
            renderOption={(props, option) => (
              <li key={option.id} {...props}>
                {option.name}
              </li>
            )}
            onChange={(e, value) => {
              handleChange("division", value.name);
              setSelectedDivision(value);
              setSelectedDistrict(null);
              setSelectedUpazila(null);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Select Division"
                placeholder="Select Division"
              />
            )}
            isOptionEqualToValue={(option, value) => 1 === 1}
            noOptionsText="No Division Matched"
          />
          {selectedDivision && (
            <Autocomplete
              fullWidth
              options={distOption}
              id="district"
              value={selectedDistrict || ""}
              autoHighlight
              getOptionLabel={(option) => option?.name || ""}
              renderOption={(props, option) => (
                <li key={option.id} {...props}>
                  {option.name}
                </li>
              )}
              onChange={(e, value) => {
                handleChange("district", value.name);
                setSelectedDistrict(value);
                setSelectedUpazila(null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Select District"
                  placeholder="Select District"
                />
              )}
              isOptionEqualToValue={(option, value) => 1 === 1}
              noOptionsText="No District Matched"
            />
          )}
          {selectedDivision && selectedDistrict && (
            <Autocomplete
              fullWidth
              options={upazilaOption}
              id="district"
              value={selectedUpazila || ""}
              autoHighlight
              getOptionLabel={(option) => option?.name || ""}
              renderOption={(props, option) => (
                <li key={option.id} {...props}>
                  {option.name}
                </li>
              )}
              onChange={(e, value) => {
                handleChange("upazila", value.name);
                setSelectedUpazila(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Select Upazilla"
                  placeholder="Select Upazilla"
                />
              )}
              isOptionEqualToValue={(option, value) => 1 === 1}
              noOptionsText="No Upazilla Matched"
            />
          )}
        </Stack>
      </Box>
      <DialogActions>
        <Button color="error" onClick={close}>
          Cancel
        </Button>
        <Button color="success" type="submit">
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

export default AddNewAmbulance;
