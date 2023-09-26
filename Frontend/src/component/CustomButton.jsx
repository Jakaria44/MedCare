// import { Button, styled } from "@mui/material";
// import React from "react";

import { Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";

export default function CustomButton({ onClick, children, ...props }) {
  const small = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      // endIcon={<KeyboardArrowRight fontSize='large' />}

      sx={{
        color: props?.variant === "contained" ? "text.light" : "text.primary",
        marginY: small ? "2vh" : "4vh",
        paddingX: { xs: 10, md: 12 },
        paddingY: 1.5,
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.2)",
        },
      }}
    >
      <Typography
        variant="button"
        color={"text.primary"}
        sx={{ fontSize: { md: "19px", sm: "15px" } }}
      >
        {children}
      </Typography>
    </Button>
  );
}
