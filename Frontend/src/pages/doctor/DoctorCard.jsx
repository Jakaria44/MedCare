import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
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
  const small = useMediaQuery((theme) => theme.breakpoints.down("md"));
  if (small) {
    return (
      <Card
        elevation={0}
        sx={{
          gap: 2,
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: small ? "row" : "row",
          borderRadius: 0,
          border: 0,
          backgroundColor: "background.paper",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardMedia>
            <Avatar
              sx={{ height: 125, width: 125 }}
              src={doctor.profileImageUrl}
              alt={doctor.name}
              loading="lazy"
            />
          </CardMedia>
        </Box>
        <CardContent sx={{ flex: 1, alignItems: "left" }}>
          <MyTypography textAlign="left" fontSize="18px">
            {doctor.name}
          </MyTypography>
          <MyTypography textAlign="left">
            {doctor.specialization} Specialist
          </MyTypography>
          <MyTypography textAlign="left">
            Fee : {doctor.appointmentFee}
          </MyTypography>
          {/* <CardActions> */}
          <Button
            sx={{ marginTop: 2 }}
            variant="contained"
            component={Link}
            to={`/doctorprofile/${doctor.id}`}
            size="small"
            p={2}
          >
            View Details
          </Button>
          {/* </CardActions> */}
        </CardContent>
      </Card>
    );
  }
  return (
    <Card raised elevation={12}>
      {/* <img
          style={{ height: 200, width: 150 }}
          src={doctor.profileImageUrl}
          alt={doctor.name}
          loading="lazy"
        /> */}
      <Box
        sx={{ padding: 0 }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <CardMedia
          component="img"
          sx={{ height: 200, width: 200 }}
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
            variant="contained"
            component={Link}
            to={`/doctorprofile/${doctor.id}`}
            size="small"
            sx={{ paddingX: 4 }}
          >
            View Details
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default DoctorCard;
