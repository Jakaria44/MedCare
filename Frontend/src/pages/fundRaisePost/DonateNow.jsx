import {
  Button,
  Dialog,
  DialogActions,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import api from "../../HTTP/httpCommonParam";
import ErrorModal from "../../component/ErrorModal";
import PrettoSlider from "../../component/PrettoSlider";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import SuccessfulModal from "../../component/SuccessfulModal";

const DonateNow = ({ open, close, postId, got, due }) => {
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("success");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("An Error Occured");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const submitHandler = async (amount) => {
    try {
      setUploading(true);
      const res = await api.post(`/fundraisePost/donate/${postId}/${amount}`);
      console.log(res.data);
      setSuccessMessage(res.data.message);
      setShowSuccessMessage(true);
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setShowErrorMessage(true);
      console.log(err);
    } finally {
      setUploading(false);
    }
  };
  return (
    <Dialog
      m={2}
      p={2}
      open={open}
      onClose={(event, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") return;
        close();
      }}
      component="form"
      noValidate={false}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        submitHandler(formData.get("amount"));
      }}
    >
      <Stack spacing={3} m={3}>
        <Typography variant="h2" textAlign="center" gutterBottom>
          Donate Now
        </Typography>
        <Divider />
        <Typography variant="body2" noWrap>
          Raised {got} of {due} BDT
        </Typography>
        <PrettoSlider value={got} max={due} />

        <TextField
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          type="number"
          name="amount"
          fullWidth
          required
        />
      </Stack>
      <DialogActions>
        <Button variant="outlined" onClick={close}>
          Cancel
        </Button>
        <Button type="submit" variant="outlined">
          Donate
        </Button>
      </DialogActions>
      <SuccessfulModal
        showSuccessMessage={showSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => {
          setShowSuccessMessage(false);
          close();
        }}
      />
      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => {
          setShowErrorMessage(false);
          close();
        }}
      />
      <SpinnerWithBackdrop backdropOpen={uploading} helperText="please wait" />
    </Dialog>
  );
};

export default DonateNow;
