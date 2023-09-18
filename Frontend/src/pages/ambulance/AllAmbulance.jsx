import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import server from "./../../HTTP/httpCommonParam";
import AddNewAmbulance from "./AddNewAmbulance";
import AmbulanceList from "./AmbulanceList";
import Filters from "./Filters";

const sortMapping = [];

export const sortOptions = [
  { query: "createdDate", name: "Newest", order: "desc" },
  { query: "createdDate", name: "Oldest", order: "asc" },

  { query: "division", name: "Division (A-Z)", order: "asc" },
  { query: "division", name: "Division (Z-A)", order: "desc" },

  { query: "driverName", name: "Driver Name (A-Z)", order: "asc" },
  { query: "driverName", name: "Driver Name (Z-A)", order: "desc" },

  { query: "district", name: "District (A-Z)", order: "asc" },
  { query: "district", name: "District (Z-A)", order: "desc" },

  { query: "upazila", name: "Upazila (A-Z)", order: "asc" },
  { query: "upazila", name: "Upazila (Z-A)", order: "desc" },

  { query: "ambulanceModel", name: "Ambulance Model (A-Z)", order: "asc" },
  { query: "ambulanceModel", name: "Ambulance Model (Z-A)", order: "desc" },
];

export const defaultQueryOptions = {
  pageNumber: 0,
  pageSize: 10,
  SortBy: "Newest",
  SortDir: "asc",
};
const AllAmbulance = ({
  queries = defaultQueryOptions,
  title = "Ambulance",
}) => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [queryOptions, setQueryOptions] = useState(defaultQueryOptions);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // [] is the initial state value
  const [total, setTotal] = useState(0); // 0 is the initial state value
  const [page, setPage] = useState(queries.page || 1);
  const [addingNewAmbulance, setAddingNewAmbulance] = useState(false);
  const [editAmbulance, setEditAmbulance] = useState(null);
  // const count = Math.ceil(data.length / queryOptions.perPage);
  // const count = Math.ceil(total / queryOptions.perPage);
  const count = useMemo(() => total, [total]);

  const handleChange = (e, p) => {
    setPage(p);
    setQueryOptions({ ...queryOptions, page: p });
    loadAllAmbulance({ ...queryOptions, page: p });
  };
  useEffect(() => {
    // loadAllBooks(queries);
    loadAllAmbulance(queries);
  }, []);

  const loadAllAmbulance = async (
    queries = queryOptions,
    apiPath = "/ambulance/getallpostbySortAndPage"
  ) => {
    setLoading(true);
    queries = {
      ...queries,
      SortBy: sortOptions.find((option) => option.name === queries.SortBy)
        .query,
      SortDir: sortOptions.find((option) => option.name === queries.SortBy)
        .order,
    };
    console.log(queries);
    try {
      const res = await server.get(apiPath, {
        params: queries,
      });
      console.log("res");
      setTotal(res.data.totalPages);
      console.log(res.data.content);
      setData(res.data.content);
    } catch (err) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Box
        pb={1}
        display="flex"
        flexDirection={matchesXs ? "column" : "row"} // Change flex direction on small devices
        justifyContent="space-between"
        alignItems={matchesXs ? "center" : "center"} // Align items differently on small devices
      >
        <Box flexGrow={1} />
        <Box>
          <Typography
            variant="h2"
            textAlign="center"
            gutterBottom
            component="div"
          >
            {title}
          </Typography>
        </Box>
        {/* Place your components to be displayed at the right end here */}
        <Box
          id="sort-by"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          <Box flexGrow={10} />
          <Box paddingRight={1}>
            <Typography variant="subtitle1">Sort by</Typography>
          </Box>
          <Box flexGrow={1}>
            <FormControl fullWidth>
              <Select
                id="demo-simple-select"
                value={queryOptions.SortBy} // Use only queryOptions.sort here
                onChange={(e) => {
                  const selectedSort = e.target.value;
                  // Validate that selectedSort is a valid sort option
                  console.log(selectedSort);
                  if (
                    sortOptions.find((option) => option.name === selectedSort)
                  ) {
                    setQueryOptions({
                      ...queryOptions,
                      SortBy: selectedSort, // Set the selectedSort value
                    });
                    loadAllAmbulance({
                      ...queryOptions,
                      SortBy: selectedSort,
                    });
                  } else {
                    // Handle invalid sort option, e.g., show an error message
                    console.error("Invalid sort option:", selectedSort);
                  }
                }}
              >
                {sortOptions.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box flexGrow={2} />
          {localStorage.getItem("user_id") !== null && (
            <Box flexGrow={1}>
              <Button
                startIcon={<Add />}
                variant="contained"
                color="success"
                onClick={() => setAddingNewAmbulance(true)}
              >
                Add new Ambulance
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Filters queryOptions={queryOptions} load={loadAllAmbulance} />

        <AmbulanceList data={data} loading={loading} load={loadAllAmbulance} />
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 2,
        }}
      >
        <Pagination
          sx={{ margin: "auto" }}
          count={count}
          color="primary"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>

      <AddNewAmbulance
        open={addingNewAmbulance}
        close={() => {
          setAddingNewAmbulance(false);

          loadAllAmbulance();
        }}
      />

      <AddNewAmbulance
        open={editAmbulance !== null}
        close={() => {
          setAddingNewAmbulance(false);

          loadAllAmbulance();
        }}
        editing={true}
        ambulance={editAmbulance}
      />
    </>
  );
};
export default AllAmbulance;
