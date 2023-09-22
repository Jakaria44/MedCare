import { Button, Divider, Grid, Stack } from "@mui/material";

import api from "./../../HTTP/httpCommonParam";

import {
  AccessAlarm,
  Description,
  Person,
  Sell,
  TaskAlt,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyTypography from "../../ui-component/MyTypography";
import randomString from "../../utils/RandomString";
import TimeFormat from "../../utils/TimeFormat";

// import { useHistory } from "react-router-dom";
const AppointmentCard = ({ doctorId, appoint, userId, upcoming = false }) => {
  const [doctor, setDoctor] = useState();
  const [user, setUser] = useState();
  // const history = useHistory();
  useEffect(() => {
    // if (doctorId == localStorage.getItem("doctor_id")) {
    loadDoctor();
    // } else {
    loadUser();
    // }
  }, []);
  const loadDoctor = async () => {
    try {
      const res = await api.get(`/getSingleDoctor/${doctorId}`);
      setDoctor(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadUser = async () => {
    try {
      const res = await api.get(`/getuserbyid/${userId}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const rowsForUser = [
    {
      icon: <Person />,
      details: (
        <Link to={`/doctorprofile/${doctorId}`}>
          <MyTypography
            fontWeight="bold"
            color="primary"
            sx={{ textDecoration: "none" }}
          >
            {" "}
            {doctor?.name}
          </MyTypography>
        </Link>
      ),
      property: "Name",
    },
    {
      icon: <TaskAlt />,
      details: doctor?.specialization,
      property: "Specialization",
    },

    {
      icon: <Sell />,
      details: doctor?.appointmentFee,
      property: "Appointment Fee",
    },

    {
      icon: <Description />,
      details: appoint?.description || "No Description",
      property: "Description",
    },
  ];
  const rowsForDoctor = [
    {
      icon: <Person />,
      details: user?.name,
      property: "Name",
    },

    {
      icon: <Sell />,
      details: doctor?.appointmentFee,
      property: "Appointment Fee",
    },

    {
      icon: <Description />,
      details: appoint?.description || "No Description",
      property: "Description",
    },
  ];

  if (!upcoming) {
    rowsForDoctor.push({
      icon: <AccessAlarm />,
      details: TimeFormat(appoint?.endTime),
      property: "End Time",
    });
    rowsForUser.push({
      icon: <AccessAlarm />,
      details: TimeFormat(appoint?.endTime),
      property: "End Time",
    });
  }
  const image =
    localStorage.getItem("doctor_id") != doctorId
      ? doctor?.profileImageUrl
      : user?.image;
  // console.log(image);
  return (
    <Grid
      container
      spacing={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} md={upcoming ? 6 : 4} m="auto">
        <img src={image} alt="Doctor Image" height={300} width={260} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={2} divider={<Divider />}>
          {localStorage.getItem("doctor_id") == doctorId
            ? rowsForDoctor?.map((item) => (
                <Stack
                  spacing={3}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  m="auto"
                >
                  <Stack spacing={1} direction="row" alignItems="center">
                    <MyTypography>{item?.icon}</MyTypography>
                    <MyTypography fontStyle="italic">
                      {item?.property}
                    </MyTypography>
                  </Stack>
                  <MyTypography>{item?.details}</MyTypography>
                </Stack>
              ))
            : rowsForUser?.map((item) => (
                <Stack
                  spacing={3}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  m="auto"
                >
                  <Stack spacing={1} direction="row" alignItems="center">
                    <MyTypography>{item?.icon}</MyTypography>
                    <MyTypography fontStyle="italic">
                      {item?.property}
                    </MyTypography>
                  </Stack>
                  <MyTypography>{item?.details}</MyTypography>
                </Stack>
              ))}
        </Stack>
      </Grid>
      {!upcoming && (
        <Grid
          item
          xs={12}
          md={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          m="auto"
        >
          <Button
            variant="contained"
            onClick={() => {
              // history.push(`/createMeet/${appoint._id}`);
              window.location.href = `/meet/${appoint.id}/${randomString(7)}`;
            }}
          >
            Create Meet
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default AppointmentCard;
