import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import React, { useEffect, useState } from "react";

import api from "./../../HTTP/httpCommonParam";
const defaultBloodPost = {
  availibility: false,
  bloodGroup: "A+",
  contact: "",
};
const AddNewBloodPost = ({
  load,
  bloodPostProp = defaultBloodPost,
  editing = false,
  open,
  close,
}) => {
  const [bloodPost, setBloodPost] = useState({
    availibility: bloodPostProp.availibility,
    bloodGroup: bloodPostProp.bloodGroup,
    contact: bloodPostProp.contact,
  });
  const [validNum, setValidNum] = useState(true);
  const [uploading, setUploading] = useState(false);
  const handleChange = (field, value) => {
    setBloodPost((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };
  const handleNumberChange = (value) => {
    const isValid = matchIsValidTel(value);
    setValidNum(isValid);
    setBloodPost((prevProfile) => ({
      ...prevProfile,
      contact: value,
    }));
  };

  useEffect(() => {
    setBloodPost(bloodPostProp);
  }, []);
  useEffect(() => {
    setBloodPost(bloodPostProp);
  }, [bloodPostProp]);
  // console.log(bloodPost, bloodPostProp);

  const submitHandler = async () => {
    if (!validNum) return;
    try {
      let res;
      setUploading(true);
      if (!editing)
        res = await api.post("/protect/blooddonatepost/create", bloodPost);
      else
        res = await api.put(
          "/protect/blooddonatepost/update/" + bloodPost.id,
          bloodPost
        );
      console.log(res.data);
      localStorage.setItem("blood_group", res.data.bloodGroup);
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
      load();
      close();
    }
  };
  return (
    <Dialog
      maxWidth="xs"
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
          {editing ? "Edit Info" : "Add new BloodPost"}
        </Typography>
        <Divider />
        <Grid
          mt={2}
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Grid item xs={12}>
            {/* <TextField
              required
              label="Contact No"
              fullWidth
              value={bloodPost.contact}
              onChange={(e) => handleChange("contact", e.target.value)}
            /> */}

            <MuiTelInput
              color={validNum ? "info" : "error"}
              disableDropdown
              defaultCountry="BD"
              onChange={handleNumberChange}
              value={bloodPost.contact}
              fullWidth
              label="Contact No"
              required
              error={!validNum}
              helperText={!validNum ? "Invalid Number" : ""}
            />
          </Grid>

          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
              <Select
                label="Blood Group"
                labelId="demo-simple-select-label"
                required
                value={bloodPost.bloodGroup}
                onChange={(e) => handleChange("bloodGroup", e.target.value)}
              >
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) =>
                    handleChange("availibility", e.target.checked)
                  }
                  color="success"
                  checked={bloodPost.availibility}
                />
              }
              label="Available"
              labelPlacement="end"
            />
          </Grid>
        </Grid>
      </Box>
      <DialogActions>
        <Button
          color="error"
          onClick={() => {
            // setBloodPost(defaultBloodPost);
            close();
          }}
        >
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

export default AddNewBloodPost;
