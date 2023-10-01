import React from "react";

import {
  Bloodtype,
  LocationOn,
  Mail,
  Person,
  Phone,
  Verified,
} from "@mui/icons-material";
import { Divider, Grid, Stack, useMediaQuery } from "@mui/material";
import MyTypography from "../../ui-component/MyTypography";
const BasicInfo = ({ user }) => {
  const userRows = [
    {
      icon: <Person />,
      property: "Name",
      info: user?.name,
    },
    {
      icon: <Mail />,
      property: "Email",
      info: user?.email,
    },
    {
      icon: <LocationOn />,
      property: "Division",
      info: user?.address?.division || "N/A",
    },
    {
      icon: <LocationOn />,
      property: "District",
      info: user?.address?.district || "N/A",
    },
    {
      icon: <LocationOn />,
      property: "Upazilla",
      info: user?.address?.upazila || "N/A",
    },
  ];

  const small = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <Grid container spacing={2} p={0}>
      <Grid
        item
        xs={12}
        md={user?.bloodDonatePostList.length > 0 ? 4 : 6}
        m="auto"
        display="flex"
        justifyContent="center"
        sx={{ padding: "0 !important" }}
      >
        <img
          src={
            localStorage.getItem("image") ??
            "https://www.w3schools.com/howto/img_avatar.png"
          }
          alt="Avatar"
          style={{
            width: "300px",
            height: "300px",
            // borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        md={user?.bloodDonatePostList.length > 0 ? 4 : 6}
        display="flex"
        justifyContent="center"
      >
        <Stack p={small ? 1 : 0} width="100%" spacing={2} divider={<Divider />}>
          {userRows.map((row) => (
            <SingleRow
              icon={row.icon}
              property={row.property}
              info={row.info}
            />
          ))}
        </Stack>
      </Grid>

      <Grid
        my={small ? 2 : 0}
        item
        xs={12}
        md={user?.bloodDonatePostList.length > 0 ? 4 : 6}
        display="flex"
        justifyContent="center"
      >
        <Stack p={small ? 1 : 0} width="100%" spacing={2} divider={<Divider />}>
          {user?.bloodDonatePostList.length > 0 && (
            <SingleRow
              icon={<Bloodtype />}
              property="Blood Group"
              info={user?.bloodDonatePostList[0].bloodGroup}
            />
          )}
          {user?.bloodDonatePostList.length > 0 && (
            <SingleRow
              icon={<Phone />}
              property="Contact No"
              info={user?.bloodDonatePostList[0].contact}
            />
          )}
          {user?.bloodDonatePostList.length > 0 && (
            <SingleRow
              icon={<Verified />}
              property="Available"
              info={user?.bloodDonatePostList[0].availibility ? "Yes" : "No"}
            />
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BasicInfo;

const SingleRow = ({ icon, property, info }) => (
  <Stack
    spacing={3}
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    m="auto"
  >
    <Stack spacing={1} direction="row" alignItems="center">
      <MyTypography>{icon}</MyTypography>
      <MyTypography fontStyle="italic">{property} </MyTypography>
    </Stack>
    <MyTypography>{info}</MyTypography>
  </Stack>
);
