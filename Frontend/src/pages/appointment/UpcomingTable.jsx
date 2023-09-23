import { TableRow } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Fragment, useState } from "react";
import { TimeFormat2, TimeFormat3 } from "../../utils/TimeFormat";
import { StyledTableCell, StyledTableRow } from "../doctor/DoctorProfile";
import AppointmentCard from "./appointmentCard";

const UpcomingTable = ({ list }) => {
  const [open, setOpen] = useState(-1);
  const isDoctor = list?.length
    ? list[0].doctorid == localStorage.getItem("doctor_id")
    : false;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center">Description</StyledTableCell>

            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Day</StyledTableCell>

            <StyledTableCell align="center">Start Time</StyledTableCell>
            <StyledTableCell align="center">End Time</StyledTableCell>
            <StyledTableCell />
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {list?.map((row, i) => (
            <Fragment key={i}>
              <TableRow
                sx={{
                  cursor: "pointer",
                }}
                bgcolor={open === i ? "success" : ""}
                onClick={() => setOpen(open == i ? -1 : i)}
              >
                <StyledTableCell component="th" scope="row" align="center">
                  {row?.description}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {TimeFormat2(row?.startTime)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(row?.startTime).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {TimeFormat3(row?.startTime)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {TimeFormat3(row?.endTime)}
                </StyledTableCell>

                <StyledTableCell>
                  <IconButton
                    aria-label="expand row"
                    onClick={() => setOpen(open == i ? -1 : i)}
                  >
                    {open === i ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </StyledTableCell>
              </TableRow>

              <StyledTableRow>
                <StyledTableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse in={open === i} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      <AppointmentCard
                        upcoming={true}
                        doctorId={row.doctorid}
                        userId={row.userid}
                        appoint={row}
                      />
                    </Box>
                  </Collapse>
                </StyledTableCell>
              </StyledTableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UpcomingTable;
