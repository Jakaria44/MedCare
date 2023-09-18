import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useMemo, useState } from "react";
import { districts } from "../../assets/bdInfo/districts";
import { divisions } from "../../assets/bdInfo/divisions";
import { upazilas } from "../../assets/bdInfo/upazilas";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const Filters = ({ queries, load }) => {
  const [selectedDivision, setSelectedDivision] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedUpazila, setSelectedUpazila] = useState();
  const [queryOptions, setQueryOptions] = useState(queries || {});
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
      load(queryOptions);
    }
  };
  return (
    <Grid item xs={12} md={4} lg={3}>
      <Card sx={{ paddingX: { xs: 2, md: 0 } }} elevation={5}>
        <CardHeader margin="auto" title="Filters" />

        <Stack direction="column" spacing={2} m={2}>
          <FormControlLabel
            control={
              <IOSSwitch
                sx={{ m: 1 }}
                checked={queryOptions.availability}
                onChange={(e) => {
                  setQueryOptions({
                    ...queryOptions,
                    availability: e.target.checked,
                  });
                  load({
                    ...queryOptions,
                    availability: e.target.checked,
                  });
                }}
              />
            }
            label={
              <Typography variant="body1" fontSize={17}>
                Available
              </Typography>
            }
          />
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
