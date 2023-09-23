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
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorModal from "../../component/ErrorModal";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import SuccessfullModal from "../../component/SuccessfulModal";
import MyTypography from "../../ui-component/MyTypography";
import { TimeFormat3 } from "../../utils/TimeFormat";
import server from "./../../HTTP/httpCommonParam";
import SlotsTable from "./SlotsTable";
const DoctorProfile = () => {
  const confirm = useConfirm();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { id } = useParams();
  const [doctor, setDoctor] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    loadDoctor();
  }, []);

  const loadDoctor = async () => {
    try {
      setLoading(true);
      const res = await server.get("/getSingleDoctor/" + id);
      console.log(res.data);

      setDoctor(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
    {
      icon: <Sell />,
      details: (
        <Chip
          variant="outlined"
          component="a"
          href={doctor?.cvUrl}
          target="_blank"
          label="View CV"
          icon={<OpenInNew />}
          clickable
        />
      ),
      property: "CV",
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
        setLoading(true);
        const res = await server.get("/protect/doctor/approved/" + doctor.id);
        setSuccessMessage("Successful! " + res.data.message);
        setShowSuccessMessage(true);
        // fetchData();
      } catch (err) {
        setErrorMessage("Something went wrong");
        setShowErrorMessage(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeclineRequest = async () => {
    try {
      await confirm({
        title: (
          <Typography variant="h3" gutterBottom>
            Delete This Application?
          </Typography>
        ),
        content: (
          <Typography variant="body1">
            Are you sure you want to delete {doctor?.name}'s application?
          </Typography>
        ),
      });

      try {
        setLoading(true);
        const res = await server.delete("/protect/deleteDoctor/" + doctor?.id);

        setSuccessMessage(res.data.message);
        setShowSuccessMessage(true);
        navigate(-1);
      } catch (err) {
        setErrorMessage("Request could not be completed");
        setShowErrorMessage(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteRequest = async () => {
    try {
      await confirm({
        title: (
          <Typography variant="h3" gutterBottom>
            Delete Doctor
          </Typography>
        ),
        content: (
          <Typography variant="body1">
            Are you sure you want to delete{" "}
            <b>
              {localStorage.getItem("doctor_id") == doctor?.id
                ? "yourself"
                : doctor?.name}{" "}
            </b>
            from list?
          </Typography>
        ),
      });

      try {
        setLoading(true);
        const res = await server.delete("/protect/deleteDoctor/" + doctor?.id);

        setSuccessMessage(res.data.message);
        setShowSuccessMessage(true);
        const mode = localStorage.getItem("colorMode");
        localStorage.clear();
        localStorage.setItem("colorMode", mode);
        navigate(-1);
      } catch (err) {
        setErrorMessage("Request could not be completed");
        setShowErrorMessage(true);
        console.log(err);
      } finally {
        setLoading(false);
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
          md={6}
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
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
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
        <Grid item xs={12} display="flex" justifyContent="left">
          <Stack spacing={2} divider={<Divider />}>
            <Typography fontSize={27} variant="body2" padding={1}>
              Description
            </Typography>
            <MyTypography textAlign="justify">
              {doctor?.description.replaceAll(/''/g, "'")}
            </MyTypography>
          </Stack>
        </Grid>
        <Grid item xs={12} m="auto" display="flex" justifyContent="center">
          {localStorage.getItem("doctor_id") == doctor?.id && (
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={"/editdoctor/" + doctor?.id}
              >
                Edit Profile
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDeleteRequest}
              >
                Delete
              </Button>
            </Stack>
          )}
          {localStorage.getItem("role") === "ROLE_ADMIN" &&
            !doctor?.approve && (
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleApproveRequest}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDeclineRequest}
                >
                  Decline
                </Button>
              </Stack>
            )}
          {localStorage.getItem("role") === "ROLE_ADMIN" && doctor?.approve && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteRequest}
            >
              Delete
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
      <SpinnerWithBackdrop backdropOpen={loading} helperText="Please wait..." />
      <SuccessfullModal
        showSuccessMessage={showSuccessMessage}
        setShowSuccessMessage={setShowSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => {
          setShowSuccessMessage(false);
          loadDoctor();
        }}
      />
      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => {
          setShowErrorMessage(false);
          loadDoctor();
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
