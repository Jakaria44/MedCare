import { OpenInNew } from "@mui/icons-material";
import { Avatar, Box, Chip, Tooltip, Typography } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import { useConfirm } from "material-ui-confirm";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import React, { useCallback, useEffect, useState } from "react";

import ErrorModal from "../../component/ErrorModal";
import StyledDataGrid from "../../component/StyledDataGrid";
import SuccessfullModal from "../../component/SuccessfulModal";
import TimeFormat from "../../utils/TimeFormat";
import server from "./../../HTTP/httpCommonParam";
import CustomNoRowsOverlay from "./../../component/CustomNoRowsOverlay";

const NoRequestOverlay = () => (
  <CustomNoRowsOverlay text="No Pending Requests" />
);

const queryOptions = {
  pageNumber: 0,
  pageSize: 1000,
};

const PendingApplications = () => {
  const confirm = useConfirm();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleApproveRequest = useCallback((row) => async () => {
    try {
      await confirm({
        title: (
          <Typography variant="h3" gutterBottom>
            Approve This Doctor?
          </Typography>
        ),
        content: (
          <Typography variant="body1" gutterBottom>
            Are you sure want to approve the application of {row.name} ?
          </Typography>
        ),
      });

      try {
        const res = await server.get("/protect/doctor/approved/" + row.id);
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
  });

  const handleDeleteRequest = useCallback((row) => async () => {
    try {
      await confirm({
        title: (
          <Typography variant="h3" gutterBottom>
            Delete This Application?
          </Typography>
        ),
        content: (
          <Typography variant="body1">
            Are you sure you want to delete {row.NAME}'s application?
          </Typography>
        ),
      });

      try {
        // const res = await server.delete("/handle-request", {
        //   data: {
        //     USER_ID: row.USER_ID,
        //     EDITION_ID: row.EDITION_ID,
        //   },
        // });

        // setSuccessMessage(res.data.message);
        setShowSuccessMessage(true);
      } catch (err) {
        // setErrorMessage(err.response.data.message);
        setShowErrorMessage(true);
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  });
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await server.get(
        "/doctor/getAllapproveDoctorWithPge/false",
        {
          params: queryOptions,
        }
      );
      const data = response.data.content.map((item) => ({
        id: item.id,
        email: item.email,
        name: item.name,
        specialization: item.specialization,
        appliedTime: TimeFormat(item.appliedTime),
        profileImageUrl: item.profileImageUrl,
        cvUrl: item.cvUrl,
        appointmentFee: item.appointmentFee,
      }));
      // console.log(data[0]);
      setRows(data);
    } catch (error) {
      setRows([]);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box height="85%">
      <Typography
        variant="body1"
        fontSize={26}
        textAlign="center"
        gutterBottom
        component="div"
      >
        Doctor Applications waiting for Approval
      </Typography>
      <StyledDataGrid
        rows={rows}
        // initialState={{
        //   pagination: { paginationModel: { pageSize: 25 } },
        // }}
        // getRowHeight={() => "auto"}
        // getEstimatedRowHeight={() => 300}
        columns={[
          {
            field: "profileImageUrl",
            headerName: "Avatar",
            headerAlign: "center",
            renderCell: (params) => (
              <Avatar alt={params.row.name} src={params.row.profileImageUrl} />
            ),
            align: "center",
            width: 70,
            sortable: false,
          },

          {
            field: "name",
            headerAlign: "center",
            headerName: "Name",
            align: "center",
            width: 170,
          },
          {
            field: "email",
            headerAlign: "center",
            align: "center",
            headerName: "Email",
            width: 190,
          },

          {
            field: "specialization",
            headerAlign: "center",
            align: "center",
            headerName: "Specialization",
            width: 180,
          },
          {
            field: "appliedTime",
            align: "center",
            headerAlign: "center",
            headerName: "Applied Date",
            width: 160,
          },
          {
            field: "appointmentFee",
            headerName: "Appointment Fee",
            width: 140,
            align: "center",
          },
          {
            field: "cvUrl",
            headerName: "CV",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
              <Chip
                variant="outlined"
                component="a"
                href={params.row.cvUrl}
                target="_blank"
                label="View CV"
                color="primary"
                icon={<OpenInNew fontSize="small" />}
                clickable
              />
            ),
            sortable: false,
            width: 150,
          },
          {
            field: "id",
            headerAlign: "center",
            headerName: "Action",
            type: "actions",
            getActions: (params) => [
              <Tooltip title="Approve Request">
                <Chip
                  label="Approve"
                  color="success"
                  onClick={handleApproveRequest(params.row)}
                />
              </Tooltip>,
              <Tooltip title="Delete Request">
                <Chip
                  label="Delete"
                  color="error"
                  onClick={handleDeleteRequest(params.row)}
                />
              </Tooltip>,
            ],
            width: 150,
          },
        ]}
        loading={loading}
        pagination
        // sortingMode={rows.length > 100 ? "server" : "client"}
        // onSortModelChange={rows.length > 100 ? handleSortModelChange : null}
        slots={{
          noRowsOverlay: NoRequestOverlay,
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        // disableColumnFilter
        disableDensitySelector
        disableColumnFilter
        disableRowSelectionOnClick
        // filterDebounceMs={300}
      />
      <SuccessfullModal
        showSuccessMessage={showSuccessMessage}
        setShowSuccessMessage={setShowSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => {
          setShowSuccessMessage(false);
          fetchData();
        }}
      />
      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => {
          setShowErrorMessage(false);
          fetchData();
        }}
      />
    </Box>
  );
};

export default PendingApplications;
