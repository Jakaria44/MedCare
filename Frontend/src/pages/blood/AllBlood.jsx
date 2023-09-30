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
import AddNewBloodPost from "./AddNewBloodPost";
import BloodList from "./BloodList";
import Filters from "./Filters";

export const sortOptions = [
  { query: "createdDate", name: "Newest", order: "desc" },
  { query: "createdDate", name: "Oldest", order: "asc" },

  { query: "bloodGroup", name: "Blood Group (A-O)", order: "asc" },
  { query: "bloodGroup", name: "Blood Group (O-A)", order: "desc" },

  { query: "division", name: "Division (A-Z)", order: "asc" },
  { query: "division", name: "Division (Z-A)", order: "desc" },

  { query: "district", name: "District (A-Z)", order: "asc" },
  { query: "district", name: "District (Z-A)", order: "desc" },

  { query: "upazila", name: "Upazila (A-Z)", order: "asc" },
  { query: "upazila", name: "Upazila (Z-A)", order: "desc" },
];

export const defaultQueryOptions = {
  pageNumber: 0,
  pageSize: 20,
  SortBy: "Newest",
  SortDir: "asc",
  availability: true,
};
const AllBlood = ({ queries = defaultQueryOptions, title = "Find Blood" }) => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [queryOptions, setQueryOptions] = useState(defaultQueryOptions);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // [] is the initial state value
  const [total, setTotal] = useState(0); // 0 is the initial state value
  const [page, setPage] = useState(queries.page || 1);
  const [addingNewBloodPost, setAddingNewBloodPost] = useState(false);
  const [editBloodPost, setEditBloodPost] = useState(false);
  // const count = Math.ceil(data.length / queryOptions.perPage);
  // const count = Math.ceil(total / queryOptions.perPage);
  const count = useMemo(() => total, [total]);

  const handleChange = (e, p) => {
    setPage(p);
    setQueryOptions({ ...queryOptions, page: p });
    loadAllBloodPost({ ...queryOptions, page: p });
  };
  useEffect(() => {
    loadAllBloodPost(queries);
  }, []);

  const loadAllBloodPost = async (
    queries = queryOptions,
    apiPath = "/blooddonatepost/getallpostbySortandPage"
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
                    loadAllBloodPost({
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
          {localStorage.getItem("blood_group") === "" && (
            <Box flexGrow={1}>
              <Button
                startIcon={<Add />}
                variant="contained"
                color="success"
                onClick={() => setAddingNewBloodPost(true)}
              >
                Add new BloodPost
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Filters queries={queryOptions} load={loadAllBloodPost} />

        <BloodList data={data} loading={loading} load={loadAllBloodPost} />
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

      <AddNewBloodPost
        open={addingNewBloodPost}
        close={() => {
          setAddingNewBloodPost(false);
        }}
        load={loadAllBloodPost}
      />
    </>
  );
};
export default AllBlood;
