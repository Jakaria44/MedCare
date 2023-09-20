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
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import api from "./../../HTTP/httpCommonParam";
const defaultBloodPost = {
  availibility: false,
  bloodGroup: "A+",
  contact: "",
};
const AddNewBloodPost = ({
  bloodPostProp = defaultBloodPost,
  editing = false,
  open,
  close,
}) => {
  const [bloodPost, setBloodPost] = useState(bloodPostProp);
  const [uploading, setUploading] = useState(false);
  const handleChange = (field, value) => {
    // console.log(field, value);
    setBloodPost((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const submitHandler = async () => {
    try {
      let res;
      if (!editing)
        res = await api.post("/protect/blooddonatepost/create", bloodPost);
      else
        res = await api.put(
          "/protect/blooddonatepost/update/" + bloodPost.id,
          bloodPost
        );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setBloodPost(defaultBloodPost);
      setUploading(false);
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
          Add new BloodPost
        </Typography>
        <Divider />
        <Grid
          mt={2}
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Grid item xs={5}>
            <TextField
              required
              label="Contact No"
              fullWidth
              value={bloodPost.contact}
              onChange={(e) => handleChange("contact", e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
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
          <Grid item xs={3}>
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
            setBloodPost(defaultBloodPost);
            close();
          }}
        >
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

export default AddNewBloodPost;
