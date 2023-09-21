import { Email, OpenInNew, Person, Sell, TaskAlt } from "@mui/icons-material";
import { Button, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useConfirm } from "material-ui-confirm";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorModal from "../../component/ErrorModal";
import SuccessfullModal from "../../component/SuccessfulModal";
import { TimeFormat3 } from "../../utils/TimeFormat";
import api from "./../../HTTP/httpCommonParam";
import SlotsTable from "./SlotsTable";
const MyTypography = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  variant: "body2",
  paddingLeft: theme.spacing(1),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingRight: theme.spacing(1),
}));
const DoctorProfile = () => {
  const confirm = useConfirm();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { id } = useParams();
  const [doctor, setDoctor] = useState();

  useEffect(() => {
    loadDoctor();
    // loadAllSlots();
  }, []);

  const loadDoctor = async () => {
    try {
      const res = await api.get("/getSingleDoctor/" + id);
      console.log(res.data);

      setDoctor(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const rows = [
    {
      icon: <Person />,
      details: doctor?.name,
      property: "Name",
    },
    {
      icon: <TaskAlt />,
      details: doctor?.specialization,
      property: "Specialization",
    },
    {
      icon: <Email />,
      details: doctor?.email,
      property: "Email",
    },
    {
      icon: <Sell />,
      details: doctor?.appointmentFee,
      property: "Appointment Fee",
    },
  ];

  const handleApproveRequest = async () => {
    try {
      await confirm({
        title: (
          <Typography variant="h3" gutterBottom>
            Approve This Doctor?
          </Typography>
        ),
        content: (
          <Typography variant="body1" gutterBottom>
            Are you sure want to approve the application of {doctor.name} ?
          </Typography>
        ),
      });

      try {
        const res = await server.get("/protect/doctor/approved/" + doctor.id);
        setSuccessMessage("Successful! " + res.data.message);
        setShowSuccessMessage(true);
        fetchData();
      } catch (err) {
        setErrorMessage("Something went wrong");
        setShowErrorMessage(true);
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Typography
        variant="body2"
        fontSize={25}
        align="center"
        gutterBottom
        pb={6}
      >
        Doctor Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={3}
          m="auto"
          display="flex"
          justifyContent="center"
        >
          <img
            src={doctor?.profileImageUrl}
            alt="Doctor Image"
            height={300}
            width={260}
          />
        </Grid>
        <Grid item xs={12} md={5} display="flex" justifyContent="center">
          <Stack spacing={2} divider={<Divider />}>
            {rows?.map((item) => (
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
        <Grid item xs={12} md={4} display="flex" justifyContent="left">
          <Stack spacing={2} divider={<Divider />}>
            <MyTypography>Description</MyTypography>
            <MyTypography textAlign="justify">
              {doctor?.description.replaceAll(/''/g, "'")}
            </MyTypography>
            <Chip
              variant="outlined"
              component="a"
              href={doctor?.cvUrl}
              target="_blank"
              label="View CV"
              icon={<OpenInNew />}
              clickable
            />
          </Stack>
        </Grid>
        <Grid item xs={12} m="auto" display="flex" justifyContent="center">
          {localStorage.getItem("role") === "ROLE_DOCTOR" && (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={"/editdoctor/" + doctor?.id}
            >
              Edit Profile
            </Button>
          )}
          {localStorage.getItem("role") === "ROLE_ADMIN" &&
            !doctor?.approve && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleApproveRequest}
              >
                Approve
              </Button>
            )}
        </Grid>
        <Grid item xs={12} m="auto" display="flex" justifyContent="center">
          <Stack spacing={2} divider={<Divider />}>
            <Typography variant="h2" textAlign="center" gutterBottom>
              Availabilities
            </Typography>
            <CustomizedTables rows={doctor?.doctorAvailabilities} />
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          m="auto"
          width="100%"
          display="flex"
          justifyContent="center"
        >
          <Stack
            spacing={2}
            m="auto"
            mt={3}
            divider={<Divider />}
            width="100%"
            justifyContent="center"
          >
            <Typography variant="h2" textAlign="center" gutterBottom>
              Upcoming Available Slots
            </Typography>

            <SlotsTable id={id} />
          </Stack>
        </Grid>
      </Grid>
      <SuccessfullModal
        showSuccessMessage={showSuccessMessage}
        setShowSuccessMessage={setShowSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => {
          fetchData();
          setShowSuccessMessage(false);
        }}
      />
      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => {
          fetchData();
          setShowErrorMessage(false);
        }}
      />
    </>
  );
};

export default DoctorProfile;

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:
      theme.palette.mode == "dark"
        ? theme.palette.grey[500]
        : theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function CustomizedTables({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Start time</StyledTableCell>
            <StyledTableCell align="center">End Time</StyledTableCell>
            <StyledTableCell align="center">Week Days</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row" align="center">
                {TimeFormat3(row.startTime)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {TimeFormat3(row.endTime)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.weekDays.charAt(0).toUpperCase() + row.weekDays.slice(1)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
