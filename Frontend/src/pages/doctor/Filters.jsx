import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import server from "./../../HTTP/httpCommonParam";
const Filters = ({ load }) => {
  const [selectedSpec, setSelectedSpec] = useState();
  const [specs, setSpecs] = useState();
  useEffect(() => {
    loadAllSpecs();
  }, []);

  const loadAllSpecs = async () => {
    try {
      const res = await server.get("/doctor/getAllSpecialization");
      console.log(res.data);
      setSpecs(res.data);
    } catch (err) {
      setSpecs([]);
      console.log(err);
    }
  };
  const submit = () => {
    if (selectedSpec) {
      load("/doctor/getAllDoctorbySpecializationWithPge/" + selectedSpec);
    } else {
      load();
    }
  };
  return (
    <Grid item xs={12} md={4} lg={3}>
      <Card sx={{ paddingX: { xs: 2, md: 0 } }} elevation={5}>
        <CardHeader margin="auto" title="Filters" />

        <Stack direction="column" spacing={2} m={2}>
          <Autocomplete
            fullWidth
            options={specs ?? []}
            id="specialization"
            value={selectedSpec || ""}
            autoHighlight
            getOptionLabel={(option) => option || ""}
            renderOption={(props, option) => (
              <li key={option} {...props}>
                {option}
              </li>
            )}
            onChange={(e, value) => setSelectedSpec(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Specialization"
                placeholder="Specialization"
              />
            )}
            isOptionEqualToValue={(option, value) => 1 === 1}
            noOptionsText="No Specialization Matched"
          />
        </Stack>
        <Box
          sx={{
            margin: "auto",

            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button onClick={submit} variant="contained">
            Submit
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default Filters;
