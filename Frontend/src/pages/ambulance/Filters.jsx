import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useMemo, useState } from "react";
import { districts } from "../../assets/bdInfo/districts";
import { divisions } from "../../assets/bdInfo/divisions";
import { upazilas } from "../../assets/bdInfo/upazilas";

const Filters = ({ queryOptions, load }) => {
  const [selectedDivision, setSelectedDivision] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedUpazila, setSelectedUpazila] = useState();
  const divOption = divisions[2].data.map((e) => ({
    id: e.id,
    name: e.name.toLowerCase(),
  }));
  const distOption = useMemo(
    () =>
      districts[2].data
        .filter((e) => e.division_id == selectedDivision?.id)
        .map((e) => ({
          id: e.id,
          division_id: e.division_id,
          name: e.name.toLowerCase(),
        })) || [],
    [selectedDivision]
  );
  const upazilaOption = useMemo(
    () =>
      upazilas[2].data
        .filter((e) => e.district_id == selectedDistrict?.id)
        .map((e) => ({
          id: e.id,
          district_id: e.district_id,
          name: e.name.toLowerCase(),
        })) || [],
    [selectedDistrict, selectedDivision]
  );

  const submit = () => {
    if (selectedUpazila) {
      load(
        queryOptions,
        `/ambulancePost/filterByupazilawithPage/${selectedUpazila.name}`
      );
    } else if (selectedDistrict) {
      load(
        queryOptions,
        `/ambulancePost/filterByDistrictwithPage/${selectedDistrict.name}`
      );
    } else if (selectedDivision) {
      load(
        queryOptions,
        `/ambulancePost/filterByDivisionwithPage/${selectedDivision.name}`
      );
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
            options={divOption}
            id="division"
            value={selectedDivision || ""}
            autoHighlight
            getOptionLabel={(option) => option?.name || ""}
            renderOption={(props, option) => (
              <li key={option.id} {...props}>
                {option.name}
              </li>
            )}
            onChange={(e, value) => {
              setSelectedDivision(value);
              setSelectedDistrict(null);
              setSelectedUpazila(null);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Division"
                placeholder="Select Division"
              />
            )}
            isOptionEqualToValue={(option, value) => 1 === 1}
            noOptionsText="No Division Matched"
          />
          <Divider />
          {selectedDivision && (
            <Autocomplete
              fullWidth
              options={distOption}
              id="district"
              value={selectedDistrict || ""}
              autoHighlight
              getOptionLabel={(option) => option?.name || ""}
              renderOption={(props, option) => (
                <li key={option.id} {...props}>
                  {option.name}
                </li>
              )}
              onChange={(e, value) => {
                setSelectedDistrict(value);
                setSelectedUpazila(null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select District"
                  placeholder="Select District"
                />
              )}
              isOptionEqualToValue={(option, value) => 1 === 1}
              noOptionsText="No District Matched"
            />
          )}
          {selectedDivision && selectedDistrict && (
            <Autocomplete
              fullWidth
              options={upazilaOption}
              id="district"
              value={selectedUpazila || ""}
              autoHighlight
              getOptionLabel={(option) => option?.name || ""}
              renderOption={(props, option) => (
                <li key={option.id} {...props}>
                  {option.name}
                </li>
              )}
              onChange={(e, value) => {
                setSelectedUpazila(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Upazilla"
                  placeholder="Select Upazilla"
                />
              )}
              isOptionEqualToValue={(option, value) => 1 === 1}
              noOptionsText="No Upazilla Matched"
            />
          )}
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
