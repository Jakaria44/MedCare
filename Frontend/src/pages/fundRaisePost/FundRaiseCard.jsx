import {
  Button,
  Card,
  CardActions,
  CardContent,
  ImageListItem,
  Menu,
  Tooltip,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { Box } from "@mui/system";
import { useConfirm } from "material-ui-confirm";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import server from "../../HTTP/httpCommonParam";
import ErrorModal from "../../component/ErrorModal";
import PrettoSlider from "../../component/PrettoSlider";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import SuccessfulModal from "../../component/SuccessfulModal";
import AddNewFundPost from "./AddPost";
import DonateNow from "./DonateNow";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
const MyTypography = ({ children, ...other }) => (
  <Typography
    gutterBottom
    variant="body2"
    fontSize={15}
    component="div"
    color="text.primary"
    sx={{ maxHeight: 48 }}
    noWrap
    {...other}
  >
    {children}
  </Typography>
);

const FundRaiseCard = ({ load, fundPost }) => {
  const confirm = useConfirm();
  const [showDonate, setShowDonate] = useState(false);

  const [editingFundPost, setEditingFundPost] = useState(false); // [editingFundPost, setEditingFundPost
  const [successMessage, setSuccessMessage] = useState("success");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("An Error Occured");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Card raised sx={{ width: { xs: "100%" } }} elevation={12}>
        <ImageListItem cols={1} rows={2}>
          <img
            style={{ height: 360, width: "100%" }}
            src={fundPost.postImages[0]?.imageName}
            alt={fundPost.title}
            loading="lazy"
          />
        </ImageListItem>

        <CardContent marginBottom="0px">
          <Tooltip title={fundPost.title.replaceAll(/''/g, "'")}>
            <MyTypography variant="h2">
              {fundPost.title.replaceAll(/''/g, "'")}
            </MyTypography>
          </Tooltip>

          <Tooltip title={fundPost.postContent}>
            <MyTypography variant="body2" noWrap>
              {fundPost.postContent.replaceAll(/''/g, "'")}
            </MyTypography>
          </Tooltip>

          <MyTypography variant="body2" noWrap>
            Raised {fundPost.donatedAmount} of {fundPost.amount} BDT
          </MyTypography>
          <PrettoSlider
            valueLabelDisplay="auto"
            value={fundPost.donatedAmount}
            max={fundPost.amount}
          />
        </CardContent>
        <CardActions>
          <Box display="flex" flexGrow={1} justifyContent="space-between">
            <Button variant="outlined" onClick={() => setShowDonate(true)}>
              Donate Now
            </Button>

            <Button
              variant="outlined"
              component={Link}
              to={"/fundpost/" + fundPost.id}
            >
              View Details
            </Button>
          </Box>
        </CardActions>
      </Card>

      <SuccessfulModal
        showSuccessMessage={showSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => {
          setShowSuccessMessage(false);
        }}
      />
      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => {
          setShowErrorMessage(false);
        }}
      />
      <AddNewFundPost
        fundPostProp={fundPost}
        editing={true}
        open={editingFundPost}
        close={() => {
          setEditingFundPost(false);
          load();
        }}
      />
      <DonateNow
        open={showDonate}
        close={() => {
          setShowDonate(false);
          load();
        }}
        got={fundPost.donatedAmount}
        due={fundPost.amount}
        postId={fundPost.id}
      />

      <SpinnerWithBackdrop backdropOpen={loading} helperText="Please Wait" />
    </>
  );
};

export default FundRaiseCard;
