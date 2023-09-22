import {
  AccessAlarm,
  Description,
  Person,
  Sell,
  TaskAlt,
} from "@mui/icons-material";
import { Button, Divider, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import MyTypography from "../../ui-component/MyTypography";
import TimeFormat from "../../utils/TimeFormat";
import api from "./../../HTTP/httpCommonParam";
import { Link } from "react-router-dom";
const appointmentCard = ({ doctorId, appoint, userId }) => {
  const [doctor, setDoctor] = useState();
  const [user, setUser] = useState();

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
      details: <Link to={`/doctorprofile/${doctorId}`}> {doctor?.name}</Link>,
      property: "Name",
    },
    {
      icon: <TaskAlt />,
      details: doctor?.specialization,
      property: "Specialization",
    },
    {
      icon: <AccessAlarm />,
      details: TimeFormat(appoint?.endTime),
      property: "End Time",
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
      icon: <AccessAlarm />,
      details: TimeFormat(appoint?.endTime),
      property: "End Time",
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

  const image =
    localStorage.getItem("doctor_id") != doctorId
      ? doctor?.profileImageUrl
      : user?.image;
  // console.log(image);
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={4}>
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
      <Grid
        item
        xs={12}
        md={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        m="auto"
      >
        <Button variant="contained" color="success">
          Consult Now
        </Button>
      </Grid>
    </Grid>
  );
};

export default appointmentCard;
