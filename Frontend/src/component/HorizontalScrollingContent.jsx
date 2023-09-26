import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const HorizontalScrollingContent = ({
  title,
  allItemLink,
  items,
  card,
  load,
}) => {
  console.log(items);
  const small = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <Paper
      elevation={0}
      sx={{
        padding: 2,
        margin: 2,
      }}
    >
      <Box
        // m={1}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="body1" fontSize={23} gutterBottom>
          {title}
        </Typography>
        {items?.length != 0 && (
          <Box display="flex" alignItems="right" justifyContent="center">
            <Button
              LinkComponent={Link}
              to={allItemLink}
              variant="contained"
              // sx={{ px: 2 }}
              color="primary"
              size="large"
              // endIcon={small ? "" : <KeyboardArrowRight />}
              // boxShadow={10}
            >
              See All
            </Button>
          </Box>
        )}
      </Box>
      {items?.length == 0 ? (
        <Paper elevation={0} sx={{ padding: 2, margin: 2 }}>
          <Box display="flex" justifyContent="center">
            <Typography variant="h5" fontSize={23} gutterBottom>
              No Data Found
            </Typography>
          </Box>
        </Paper>
      ) : (
        <HorizontalScroll>
          {items?.map((item, i) => (
            <Box key={i} width={350}>
              {card(item, load)}
            </Box>
          ))}
        </HorizontalScroll>
      )}
    </Paper>
  );
};

export default HorizontalScrollingContent;

const HorizontalScroll = ({ children }) => {
  return (
    <Paper
      elevation={3}
      p={3}
      m={3}
      sx={{ width: "100%", overflowX: "scroll" }}
    >
      <Stack
        spacing={3}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        m="auto"
      >
        <Stack spacing={1} direction="row" alignItems="center">
          {children}
        </Stack>
      </Stack>
    </Paper>
  );
};
