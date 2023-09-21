import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

import { Link } from "react-router-dom";
const MyTypography = ({ children, ...other }) => (
  <Typography
    gutterBottom
    variant="body2"
    fontSize={15}
    component="div"
    color="text.primary"
    sx={{ maxHeight: 48 }}
    noWrap
    textAlign="center"
    {...other}
  >
    {children}
  </Typography>
);

const DoctorCard = ({ doctor }) => {
  return (
    <Card raised elevation={12}>
      {/* <img
          style={{ height: 200, width: 150 }}
          src={doctor.profileImageUrl}
          alt={doctor.name}
          loading="lazy"
        /> */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <CardMedia
          component="img"
          sx={{ height: 200, width: 150 }}
          image={doctor.profileImageUrl}
          alt={doctor.name}
          loading="lazy"
        />
        <CardContent marginBottom="0px" sx={{ alignItems: "center" }}>
          <MyTypography>{doctor.name}</MyTypography>
          <MyTypography> {doctor.specialization} Specialist</MyTypography>
          <MyTypography> Fee : {doctor.appointmentFee}</MyTypography>
        </CardContent>
        <CardActions>
          <Button
            component={Link}
            to={`/doctorprofile/${doctor.id}`}
            size="small"
            p={2}
          >
            View Details
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default DoctorCard;
