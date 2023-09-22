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
import server from "../../HTTP/httpCommonParam";
import AddNewFundPost from "./AddPost";
import FundPostList from "./PostList";

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
  pageSize: 50,
  SortBy: "Newest",
  SortDir: "asc",
};
const AllPost = ({ queries = defaultQueryOptions, pending = false }) => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [queryOptions, setQueryOptions] = useState(defaultQueryOptions);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(queries.page || 1);
  const [addingNewFundPost, setAddingNewFundPost] = useState(false);
  const count = useMemo(() => total, [total]);

  // const pending = localStorage.getItem("role") === "ROLE_ADMIN";

  const handleChange = (e, p) => {
    setPage(p);
    setQueryOptions({ ...queryOptions, page: p });
    loadFundPost({ ...queryOptions, page: p });
  };
  useEffect(() => {
    loadFundPost(queries);
  }, [pending]);
  useEffect(() => {
    loadFundPost(queries);
  }, []);
  const loadFundPost = async (
    queries = queryOptions,
    apiPath = "/fundpost/getallpost/page/"
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
      const res = await server.get(apiPath + !pending, {
        params: queries,
      });
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
            {pending ? "Pending Fund Raise Posts" : "All Fund Raise Post"}
          </Typography>
        </Box>
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
          {localStorage.getItem("user_id") && !pending && (
            <Box flexGrow={1}>
              <Button
                startIcon={<Add />}
                variant="contained"
                color="success"
                onClick={() => setAddingNewFundPost(true)}
              >
                New Post
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Grid container spacing={2}>
        <FundPostList
          data={data}
          loading={loading}
          load={loadFundPost}
          toApprove={pending}
        />
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

      <AddNewFundPost
        open={addingNewFundPost}
        close={() => {
          setAddingNewFundPost(false);
        }}
        load={loadFundPost}
      />
    </>
  );
};
export default AllPost;
