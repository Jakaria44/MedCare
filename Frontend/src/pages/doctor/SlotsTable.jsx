import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Button,
  Divider,
  Grid,
  Stack,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useConfirm } from "material-ui-confirm";
import * as React from "react";
import ErrorModal from "../../component/ErrorModal";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import SuccessfulModal from "../../component/SuccessfulModal";
import { TimeFormat2, TimeFormat3 } from "../../utils/TimeFormat";
import api from "./../../HTTP/httpCommonParam";
import { StyledTableCell, StyledTableRow } from "./DoctorProfile";

function createData(arr) {
  return {
    localDate: TimeFormat2(arr[0].localDate),
    day: new Date(arr[0].localDate).toLocaleDateString("en-US", {
      weekday: "long",
    }),
    items: arr.map((item) => ({
      ...item,
      startTime: TimeFormat3(item.startTime),
      endTime: TimeFormat3(item.endTime),
    })),
  };
}

const CollapsedTable = ({ items, handleBook }) => (
  <Table size="small" aria-label="purchases">
    <TableHead>
      <StyledTableRow>
        <StyledTableCell align="center">Start</StyledTableCell>
        <StyledTableCell align="center">End</StyledTableCell>
        <StyledTableCell align="center">Action</StyledTableCell>
      </StyledTableRow>
    </TableHead>
    <TableBody>
      {items.map((historyRow) => (
        <StyledTableRow key={historyRow.id}>
          <StyledTableCell align="center">
            {historyRow.startTime}
          </StyledTableCell>
          <StyledTableCell align="center">{historyRow.endTime}</StyledTableCell>
          <StyledTableCell align="center">
            <Button
              variant="outlined"
              color="success"
              onClick={() => handleBook(historyRow.id)}
            >
              Book Now
            </Button>
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  </Table>
);
export default function SlotsTable({ id }) {
  const [open, setOpen] = React.useState(-1);
  const confirm = useConfirm();
  const [loading, setLoading] = React.useState(false);
  const [allSlots, setAllSlots] = React.useState();
  const [loadedData, setLoadedData] = React.useState();

  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);

  const large = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const openedIcon = large ? <KeyboardArrowLeft /> : <KeyboardArrowUpIcon />;
  const closedIcon = large ? <KeyboardArrowRight /> : <KeyboardArrowDownIcon />;
  React.useEffect(() => {
    loadAllSlots();
  }, []);

  const handleBook = async (slotId) => {
    // setBooking(true);

    const body = loadedData.filter((item) => item.id == slotId)[0];
    let description = "";
    try {
      await confirm({
        title: (
          <Typography variant="h3" gutterBottom>
            Confirm Appointment
          </Typography>
        ),
        content: (
          <Stack spacing={2} divider={<Divider />}>
            <Typography variant="h4">Appointment details</Typography>
            <Typography variant="body2">
              Date: {TimeFormat2(body.localDate)} <br />
              Day:{" "}
              {new Date(body.localDate).toLocaleDateString("en-US", {
                weekday: "long",
              })}
              <br />
              Time: {TimeFormat3(body.startTime)} - {TimeFormat3(body.endTime)}
            </Typography>
            <Typography variant="body2">Give a short description</Typography>
            <TextField
              variant="standard"
              fullWidth
              label="Description"
              multiline
              maxRows={3}
              placeholder="Provide a short description..."
              onChange={(e) => {
                description = e.target.value;
              }}
            />
          </Stack>
        ),
      });
      // console.log(body, description);
      const submissionBody = {
        localDate: body.localDate,
        description: description,
        startTime: body.startTime,
        endTime: body.endTime,
      };
      try {
        setLoading(true);
        const res = await api.post(
          `/protect/createappoint/${id}/${localStorage.getItem("user_id")}`,
          submissionBody
        );
        setSuccessMessage("Successful! " + res.data.message);
        setShowSuccessMessage(true);
        // loadAllSlots();
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
    // }
  };

  const loadAllSlots = async () => {
    try {
      const res = await api.get("/Slot/SingleDoctor/" + id);
      console.log(res.data);
      const groupedData = res.data.reduce((result, currentItem) => {
        const groupKey = currentItem.localDate;

        if (!result[groupKey]) {
          result[groupKey] = [];
        }

        result[groupKey].push(currentItem);

        return result;
      }, {});
      console.log(groupedData);

      const customRows = Object.entries(groupedData)
        .sort((a, b) => new Date(a[0]) - new Date(b[0]))
        .map(([, item]) => createData(item));
      setAllSlots(customRows);
      setLoadedData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid
      item
      xs={12}
      container
      direction="row"
      spacing={2}
      justifyContent="center"
    >
      <Grid item xs={12} md={open != -1 ? 6 : 6}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Day</StyledTableCell>
                <StyledTableCell align="center">Total Slots</StyledTableCell>
                <StyledTableCell />
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {allSlots?.map((row, i) => (
                <React.Fragment key={i}>
                  <TableRow
                    sx={{
                      // "& > *": { borderBottom: "unset" },
                      cursor: "pointer",
                    }}
                    bgcolor={open === i ? "success" : ""}
                    onClick={() => setOpen(open == i ? -1 : i)}
                  >
                    <StyledTableCell component="th" scope="row" align="center">
                      {row.localDate}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.day}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.items.length}
                    </StyledTableCell>

                    <StyledTableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(open == i ? -1 : i)}
                      >
                        {open === i ? openedIcon : closedIcon}
                      </IconButton>
                    </StyledTableCell>
                  </TableRow>
                  {!large && (
                    <StyledTableRow>
                      <StyledTableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                      >
                        <Collapse in={open !== -1} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <CollapsedTable
                              items={row.items}
                              handleBook={handleBook}
                            />
                          </Box>
                        </Collapse>
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} md={open != -1 ? 6 : 12}>
        {/* <Slide in={open !== -1}> */}
        <TableContainer component={Paper}>
          {large && open !== -1 && (
            <CollapsedTable
              items={allSlots[open].items}
              handleBook={handleBook}
            />
          )}
        </TableContainer>
        {/* </Slide> */}
      </Grid>
      <SpinnerWithBackdrop backdropOpen={loading} helperText="Please Wait..." />
      <SuccessfulModal
        showSuccessMessage={showSuccessMessage}
        setShowSuccessMessage={setShowSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => {
          setShowSuccessMessage(false);
          loadAllSlots();
        }}
      />
      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => {
          setShowErrorMessage(false);
          loadAllSlots();
        }}
      />
    </Grid>
  );
}
