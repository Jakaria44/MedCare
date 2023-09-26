import { Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const CustomButtonContained = ({ onClick, text, props }) => {
  const small = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <Button
      variant="contained"
      onClick={onClick}
      // endIcon={<KeyboardArrowRight fontSize='large' />}

      sx={{
        // color: 'text.light',
        marginY: small ? "2vh" : "4vh",
        paddingX: { xs: 10, md: 12 },
        paddingY: 1.5,
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.2)",
        },
      }}
      {...props}
    >
      <Typography
        variant="button"
        sx={{ fontSize: { md: "19px", sm: "15px" } }}
      >
        {text}
      </Typography>
    </Button>
  );
};

export default CustomButtonContained;
