import { ContentCopy } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";
const AmbulanceDetails = ({
  data,
  setView = () => {},
  setEdit = () => {},
  profile = false,
  handleDelete = () => {},
}) => {
  const { driver, contact, ac, image } = data;
  const [copied, setCopied] = useState(false);
  const small = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{
        // transform: "translate(-50%,-50%)",
        width: "auto",
        bgcolor: "background.paper",
        boxShadow: 24,
        margin: "auto",
        p: 4,
      }}
    >
      <Typography variant="h2" gutterBottom pb={4}>
        Ambulance Details
      </Typography>

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent="space-evenly"
        gap={2}
        flexDirection={profile && !small ? "row" : "column"}
      >
        <img src={image} alt="image" width={400} maxWidth="80%" />
        <Stack
          width={"100%"}
          spacing={2}
          divider={<Divider />}
          mt={small || !profile ? 3 : 0}
        >
          <Stack direction="row" spacing={2} justifyContent={"space-between"}>
            <Typography fontSize={16} variant="body2" gutterBottom mt={2}>
              Driver Name
            </Typography>
            <Typography fontSize={16} variant="body2" gutterBottom mt={2}>
              {driver}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontSize={16} variant="body2" gutterBottom mt={2}>
              Contact
            </Typography>
            <Box
              display={"flex"}
              direction="row"
              alignItems={"center"}
              justifyContent={"center"}
              margin="auto"
            >
              <Typography fontSize={16} variant="body2">
                {contact}
              </Typography>
              {/* <Tooltip title={copied ? "Copied!" : "Copy"}> */}
              <CopyToClipboard text={contact} onCopy={() => setCopied(true)}>
                <IconButton color={copied ? "success" : "primary"}>
                  <ContentCopy />
                </IconButton>
              </CopyToClipboard>
              {/* </Tooltip> */}
            </Box>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent={"space-between"}>
            <Typography fontSize={16} variant="body2" gutterBottom>
              Air Condition
            </Typography>
            <Typography
              fontSize={16}
              variant="body2"
              gutterBottom
              color={ac ? "success" : "error"}
            >
              {ac ? "Available" : "Not Available"}
            </Typography>
          </Stack>

          <Box
            display={"flex"}
            justifyContent={profile ? "center" : "flex-end"}
          >
            {!profile ? (
              <Button
                variant="contained"
                color="info"
                sx={{ px: 4 }}
                onClick={() => setView(-1)}
              >
                Back
              </Button>
            ) : (
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="info"
                  sx={{ px: 4 }}
                  onClick={() => setEdit(true)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ px: 4 }}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Stack>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default AmbulanceDetails;
