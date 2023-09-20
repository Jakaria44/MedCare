import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const SpinnerWithBackdrop = ({ backdropOpen, helperText }) => {
  // console.log("first");
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={backdropOpen}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        margin="auto"
      >
        <CircularProgress color="inherit" />
        <Typography variant="body2" color="inherit" mt={2}>
          {helperText}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default SpinnerWithBackdrop;
